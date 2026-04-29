
using Bl.Api;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Bl.Services
{
    public class QueueService: IQueueService
    {
        private readonly IQueuesDal _queueDal; 
        public QueueService(IQueuesDal queueDal) 
        {
            _queueDal = queueDal;
        }


        //בדיקה על מספר זהות ישראלי
        private bool IsValidIsraeliID(string id)
        {
            // 1. בדיקה שהקלט הוא אכן מספר ושאורכו לא עולה על 9 ספרות
            if (string.IsNullOrEmpty(id) || id.Length > 9 || !id.All(char.IsDigit))
                return false;

            // 2. השלמת אפסים מובילים ל-9 ספרות (למשל "123456" יהפוך ל-"000123456")
            id = id.PadLeft(9, '0');

            int sum = 0;

            // 3. אלגוריתם ספרת ביקורת
            for (int i = 0; i < 9; i++)
            {
                // הפיכת התו למספר
                int digit = id[i] - '0';

                // מכפילים לסירוגין ב-1 וב-2
                int step = digit * ((i % 2) + 1);

                // אם התוצאה דו-ספרתית (למשל 12), מחברים את ספרותיה (1+2=3)
                // טריק מתמטי: חיסור 9 ממספר דו-ספרתי נותן את סכום ספרותיו
                sum += (step > 9) ? (step - 9) : step;
            }

            // 4. המספר תקין אם הסכום הכולל מתחלק ב-10 ללא שארית
            return (sum % 10 == 0);
        }


       public List<Queue> GetQueuesOfToday(string doctorId, DateTime? date=null)
        {
            if (!IsValidIsraeliID(doctorId.ToString()))
            {
               throw new ArgumentException("Invalid Israeli ID format for doctorId.");
            }
            DateTime finalDate = date ?? DateTime.Now;
            var allqueues = _queueDal.GetQueuesOfToday(doctorId,finalDate);
            if (allqueues == null )
            {
                return new List<Queue>();
            }


            var todayqueues=allqueues.Where(q => q.Date.Date == finalDate.Date ).ToList();
            if (todayqueues == null || !todayqueues.Any())
            {
                throw new InvalidOperationException("No allqueues found for today for the given doctor .");
            }
            return todayqueues;
        }
    }
}
