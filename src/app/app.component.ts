import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadosService } from "src/app/servicios/empleados.service";

export interface empleados {
  cc: string;
  nombre: string;
  jefe: string;
}

const ELEMENT_DATA: empleados[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['cc', 'nombre', 'jefe'];
  datosEmpleados:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosEmpleados);

  ngOnInit(): void {
    this.consultarEmpleados();
  }

  constructor(
    private empleadosService: EmpleadosService,
  ) { }

  consultarEmpleados() {
    this.empleadosService.consultarEmpleados().subscribe(resultado => {
      this.datosEmpleados = resultado;
      this.dataSource = new MatTableDataSource<empleados>(this.datosEmpleados);
    });
  }

}
