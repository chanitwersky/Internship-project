using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc; 
using Bl.Services;
using Dal.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShiftsController : ControllerBase
    {
        private readonly ShiftBi _shiftBi;

       
        public ShiftsController(IShiftBi shiftBi)
        {
            _shiftBi = shiftBi;
        }

        [HttpGet("{doctorId}")]
        public List<Shift> GetShiftsByDoctorId(string doctorId)
        {
            return _shiftBi.GetShiftsByDoctorId(doctorId);
        }
    }
}