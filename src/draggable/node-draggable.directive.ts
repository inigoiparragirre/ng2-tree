import { Directive, ElementRef, Input, Inject, Renderer, OnDestroy, OnInit } from '@angular/core';
import { NodeDraggableService } from './node-draggable.service';
import { CapturedNode } from './captured-node';
import { Tree } from '../tree';
import { LocalFilereaderService } from '../../../../src/app/services/localfilereader.service';
import * as mime from 'mime'
import { ElectronService } from 'ngx-electron';

@Directive({
  selector: '[nodeDraggable]'
})
export class NodeDraggableDirective implements OnDestroy, OnInit {
  public static DATA_TRANSFER_STUB_DATA: string = 'some browsers enable drag-n-drop only when dataTransfer has data';

  @Input()
  public nodeDraggable: ElementRef;

  @Input()
  public tree: Tree;

  private nodeNativeElement: HTMLElement;
  private disposersForDragListeners: Function[] = [];

  public constructor( 
    private electronService: ElectronService,
    @Inject(ElementRef) public element: ElementRef,
    @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
    private localFilereader: LocalFilereaderService,
    @Inject(Renderer) private renderer: Renderer) {
    this.nodeNativeElement = element.nativeElement;
  }

  public ngOnInit(): void {
    if (!this.tree.isStatic()) {
      this.renderer.setElementAttribute(this.nodeNativeElement, 'draggable', 'true');
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
      this.disposersForDragListeners.push(this.renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
    }
  }

  public ngOnDestroy(): void {
    /* tslint:disable:typedef */
    this.disposersForDragListeners.forEach(dispose => dispose());
    /* tslint:enable:typedef */
  }

  // Get path of an objet
  private getPath = function (target, path) {
    if (target.parent) {
      path = target.parent.value + '/' + path;
      return this.getPath(target.parent, path);
    }
    else return path;
  }

  private convertToPlain(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
}

  private handleDragStart(e: DragEvent): any {
    e.stopPropagation();

    this.nodeDraggableService.captureNode(new CapturedNode(this.nodeDraggable, this.tree));

    let tree = this.nodeDraggableService.getCapturedNode().tree;
    let path = tree.value;
    let fullPath = this.getPath(tree, path);

    let dragIcon; 
    let src = 'invalidImage';
    let mimeType = mime.lookup(fullPath);
    if((mimeType == "image/png") || (mimeType == "image/jpg") )
     src = this.localFilereader.readBase64Image(fullPath);



    if(src !='invalidImage')
    {
      dragIcon = document.createElement('img');
      dragIcon.src = src;
      var width = 150;
      var height = width * (3/4); // The height must be set explicitly. I'm assuming the image is 4:3 for this example
      var c = document.createElement("canvas");
       document.body.appendChild(c);
      c.width = width;
      c.height = height;
      c.style.zIndex="-1000";
      c.style.display="none";
      var ctx = c.getContext('2d');
      ctx.drawImage(dragIcon,0,0,width,height);
      dragIcon.src = c.toDataURL();
      e.dataTransfer.setDragImage(dragIcon, 20, 20);
    }     

     if((mimeType == "application/rtf") || (mimeType == "text/rtf"))
     {
           let file = this.localFilereader.readFile(fullPath);
           let reader = new FileReader();
           reader.onload = ()=>{
            //this.electronService.clipboard.writeRTF(reader.result);
            let plainText = this.convertToPlain(reader.result);
            console.log(plainText)
            this.electronService.clipboard.writeText(plainText);
            dragIcon = document.createElement('img');
            dragIcon.src = src;
            var width = 150;
            var height = width * (3/4); // The height must be set explicitly. I'm assuming the image is 4:3 for this example
            var c = document.createElement("canvas");
            document.body.appendChild(c);
            
            c.width = width;
            c.height = height;
            c.style.zIndex="-1000";
            c.style.display="none";
            var ctx = c.getContext('2d');
            ctx.fillText(plainText, 20, 20, 400);

            dragIcon.src = c.toDataURL();
            e.dataTransfer.setDragImage(dragIcon, 20, 20);
           }
           reader.readAsText(file);
     }

    if((mimeType == "text/plain"))
     {
           let file = this.localFilereader.readFile(fullPath);
           let reader = new FileReader();
           reader.onload = ()=>{
            this.electronService.clipboard.writeText(reader.result);
            dragIcon = document.createElement('img');
            dragIcon.src = src;
            var width = 150;
            var height = width * (3/4); // The height must be set explicitly. I'm assuming the image is 4:3 for this example
            var c = document.createElement("canvas");
            document.body.appendChild(c);
            c.width = width;
            c.height = height;
            c.style.zIndex="-1000";
            c.style.display="none";
            var ctx = c.getContext('2d');
            ctx.fillText(reader.result, 20, 20, 400);
            dragIcon.src = c.toDataURL();
            e.dataTransfer.setDragImage(dragIcon, 20, 20);
           }
           reader.readAsText(file);
     }


    e.dataTransfer.setData('itempath', fullPath);
    e.dataTransfer.effectAllowed = 'move';

  }

  private handleDragOver(e: DragEvent): any {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  private handleDragEnter(e: DragEvent): any {
    e.preventDefault();
    if (this.containsElementAt(e)) {
      this.addClass('over-drop-target');
    }
  }

  private handleDragLeave(e: DragEvent): any {
    if (!this.containsElementAt(e)) {
      this.removeClass('over-drop-target');
    }
  }

  private handleDrop(e: DragEvent): any {
    e.preventDefault();
    e.stopPropagation();

    this.removeClass('over-drop-target');

    if (!this.isDropPossible(e)) {
      return false;
    }

    if (this.nodeDraggableService.getCapturedNode()) {
      return this.notifyThatNodeWasDropped();
    }
  }

  private isDropPossible(e: DragEvent): boolean {
    const capturedNode = this.nodeDraggableService.getCapturedNode();
    return capturedNode
      && capturedNode.canBeDroppedAt(this.nodeDraggable)
      && this.containsElementAt(e);
  }

  private handleDragEnd(e: DragEvent): any {
    this.removeClass('over-drop-target');
    this.nodeDraggableService.releaseCapturedNode();
  }

  private containsElementAt(e: DragEvent): boolean {
    const { x = e.clientX, y = e.clientY } = e;
    return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
  }

  private addClass(className: string): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.add(className);
  }

  private removeClass(className: string): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.remove(className);
  }

  private notifyThatNodeWasDropped(): void {
    this.nodeDraggableService.fireNodeDragged(this.nodeDraggableService.getCapturedNode(), this.nodeDraggable);
  }
}
