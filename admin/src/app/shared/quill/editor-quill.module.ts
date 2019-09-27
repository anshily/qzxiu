import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {EditorQuillComponent} from './editor-quill.component';
import {EditorQuillComponent} from "@shared/quill/editor-quill.component"
import {SharedModule} from "@shared/shared.module";
import {QuillModule} from "ngx-quill";
import {ProcessService} from "@shared/process.service";
import {ImageCropperModule} from "ngx-image-cropper";
// import {ImageCropperModule} from "ngx-image-cropper";


@NgModule({
    imports: [CommonModule, SharedModule, QuillModule,ImageCropperModule],
    declarations: [EditorQuillComponent],
    exports: [
        EditorQuillComponent,
    ],
    providers: [ProcessService],
})
export class EditorQuillModule {
}
