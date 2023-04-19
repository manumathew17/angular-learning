
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import {NgModule} from '@angular/core';

@NgModule({
    exports: [MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatButtonModule]
  }
)
export class MaterialModule {

}
