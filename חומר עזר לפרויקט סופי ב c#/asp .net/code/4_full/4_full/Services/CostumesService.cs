using _4_full.Data;
using _4_full.Models;
using Microsoft.EntityFrameworkCore;

namespace _4_full.Services
{
    // TODO: try - catch in every func
    public class CostumesService
    {
        private StoreDbContext _db;
        public CostumesService(StoreDbContext db)
        {
            _db = db;
        }

        public List<Costume> GetAll()
        {
            return _db.Costumes.ToList();
        }

        public Costume? Get(int id)
        {
            return _db.Costumes.Find(id);
        }

        public int Create(Costume costume)
        {
            _db.Costumes.Add(costume);
            _db.SaveChanges();
            return costume.Id;
        }

        public bool Delete(int id)
        {
            var item = _db.Costumes.Find(id);
            if (item == null)
            {
                return false;
            }
            _db.Costumes.Remove(item);
            _db.SaveChanges();
            return true;
        }
    }
}
