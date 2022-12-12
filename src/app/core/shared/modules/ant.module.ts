import { NgModule } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSliderModule } from 'ng-zorro-antd/slider';
@NgModule({
  declarations: [],
  imports: [NzModalModule],
  exports: [
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzAlertModule,
    NzCardModule,
    NzAvatarModule,
    NzAutocompleteModule,
    NzBreadCrumbModule,
    NzEmptyModule,
    NzMessageModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzTabsModule,
    NzPopoverModule,
    NzSkeletonModule,
    NzSpaceModule,
    NzTagModule,
    NzDropDownModule,
    NzNotificationModule,
    NzSliderModule,
  ],
  providers: [NzNotificationService],
})
export class AntModule {}
