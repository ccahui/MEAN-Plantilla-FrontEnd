export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string, // Valores opcionales
        public role?: string,
        public _id?: string,
        public google?: boolean
    ) { }
}
