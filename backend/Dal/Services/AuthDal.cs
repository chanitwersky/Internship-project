using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class AuthDal : IAuthDal
    {
        private readonly Datamanager _context;

        public AuthDal(Datamanager context)
        {
            _context = context;
        }

        public async Task<Worker?> GetDById(string doctorId)
        {
            Worker worker = await _context.Workers.FirstOrDefaultAsync(s => s.WorkerId == doctorId);
            return worker;
        }

        public async Task<Customer?> GetPById(string pId)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(s => s.CostumerId == pId);
            return customer;
        }
    }


}