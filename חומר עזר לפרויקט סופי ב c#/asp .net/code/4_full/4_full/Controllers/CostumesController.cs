using _4_full.Models;
using _4_full.Services;
using Microsoft.AspNetCore.Mvc;

namespace _4_full.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CostumesController: ControllerBase
    {
        private CostumesService _svc;
        public CostumesController(CostumesService service)
        {
            _svc = service;
        }

        [HttpGet]
        public ActionResult<List<Costume>> GetAll()
        {
            return _svc.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Costume> Get(int id)
        {
            var item = _svc.Get(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public ActionResult<int> Create([FromBody] Costume item)
        {
            return _svc.Create(item);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            return _svc.Delete(id);
        }
    }
}
