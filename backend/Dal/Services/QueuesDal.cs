using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    internal class QueuesDal: IQueuesDal
    {
        private Datamanager _db;
        public QueuesDal(Datamanager db)
        {
            _db = db;
        }
       async public Task<  List<Queue>> GetQueuesOfToday(string doctorId, DateTime date)
        {
            var queues = _db.Queues.Where(q => q.WorkerId == doctorId ).ToListAsync();
            return  await queues ;
        }
    }
}
