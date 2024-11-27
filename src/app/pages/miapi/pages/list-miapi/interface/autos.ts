export interface autos {
    autos: Auto[];
}

export interface Auto {
    _id?:           string;
    marca:         string;
    modelo:        string;
    fechaCreacion: number;
    precio:        number;
    kilometraje:   number;
    color:         string;
    numeroPuertas: number;
    ubicacion:     string;
    descripcion:   string;
}