using System;
using System.Collections.Generic;

namespace WebbAppReact.Models;

public partial class Product
{
    public int Id { get; set; }

    public string CodigoDeProducto { get; set; } = null!;

    public string NombreArt { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public int Cantidad { get; set; }
}
