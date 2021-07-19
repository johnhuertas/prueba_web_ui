import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadosService } from "src/app/servicios/empleados.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface empleados {
  id: string;
  cargo: string;
  jefe: string;
  nombre: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre','cargo', 'jefe'];
  datosEmpleados:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosEmpleados);

  formulario: FormGroup;



  constructor(
    private empleadosService: EmpleadosService,
    private formBuilder: FormBuilder,
  ) { }

  
  ngOnInit(): void {
    this.crearTabla();
    this.crearFormulario();
    this.consultarEmpleados();
  }

  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      ID: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      CARGO: ['', [Validators.required]],
      JEFE: ['', [Validators.required]],
    });
  }

  limpiar(){
    this.crearFormulario();
  }

  consultarEmpleados() {
    this.empleadosService.consultarEmpleados().subscribe(resultado => {
      this.datosEmpleados = resultado;
      this.dataSource = new MatTableDataSource<empleados>(this.datosEmpleados);
    });
  }

  crearTabla() {
    this.empleadosService.crearTabla().subscribe(resultado => {
      this.datosEmpleados = resultado;
    });
  }

  async crearEmpleado(){
    const body={
      id: this.formulario.controls.ID.value,
      nombre: this.formulario.controls.NOMBRE.value,
      cargo: this.formulario.controls.CARGO.value,
      jefe: this.formulario.controls.JEFE.value,
    }
    this.empleadosService.crearEmpleado(body).subscribe(res=>{
      if (res) {
        this.consultarEmpleados();
        this.limpiar();
      }
    })
  }

  habilitarCrear(){
    if (this.formulario.valid) {
      return false;
    }else{
      return true;
    }
  }

}
