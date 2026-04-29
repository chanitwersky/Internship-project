using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace _3_request_pipeline.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    [OutputCache(Duration = 20)]
    public class CalculatorController: ControllerBase
    {
        [HttpGet]
        public ActionResult<int> Add([FromQuery] int num1, [FromQuery] int num2)
        {
            Console.WriteLine($"Added two numbers {num1} + {num2} = {num1+num2}");
            return num1 + num2;
        }

        [HttpGet]
        public ActionResult<float> Divide(int num1, int num2)
        {
            Console.WriteLine($"Divided two numbers {num1} / {num2} = {num1 / num2}");
            return num1 / num2;
        }
    }
}
