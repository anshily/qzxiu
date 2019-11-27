import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
// i18n
import { TranslateModule } from '@ngx-translate/core';

// #region third libs
import {NgZorroAntdModule, NzButtonModule, NzDividerModule, NzTabsModule} from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { UEditorModule } from 'ngx-ueditor';
import { NgxTinymceModule } from 'ngx-tinymce';
import {UploadImgComponent} from "@shared/zi-upload-img/upload-img.component";
import {CropperComponent} from "@shared/cropper/cropper.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {ImgUploadComponent} from "@shared/img-upload/img-upload.component";

const THIRDMODULES = [NgZorroAntdModule, CountdownModule, UEditorModule, NgxTinymceModule, NzCollapseModule,
  NzSelectModule,
  NzButtonModule,
  NzTabsModule,
  NzDividerModule,
  ImageCropperModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [UploadImgComponent, CropperComponent, ImgUploadComponent];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
    // i18n
    TranslateModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [CropperComponent]
})
export class SharedModule {}
