using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IQueueService
    {
     public   List<Queue> GetQueuesOfToday(string doctorId, DateTime? date=null);
    }
}
