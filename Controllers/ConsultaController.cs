using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using WebbAppReact.Models;

namespace WebbAppReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private readonly DbprodContext _dbcontext;
        public ConsultaController(DbprodContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Listar()
        {
            List<Product> lista = await _dbcontext.Products.OrderBy(t => t.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Nuevo")]
        public async Task<IActionResult> Guardar([FromBody] Product request)
        {
            await _dbcontext.Products.AddAsync(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] Product request)
        {
            _dbcontext.Products.Update(request);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{codigo}")]
        public async Task<IActionResult> Eliminar(string codigo)
        {

            Product producto = _dbcontext.Products.SingleOrDefault(c => c.CodigoDeProducto == codigo);
            _dbcontext.Products.Remove(producto);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
