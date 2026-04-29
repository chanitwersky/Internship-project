using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IQueuesDal
    {
   Task< List<Queue>> GetQueuesOfToday(string doctorId, DateTime date);
    }
}
