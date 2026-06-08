using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("~/api/appointments/client/{clientId}")]
        [HttpGet("appointments/{clientId}")]
        [HttpGet("getbyid/appointments/{clientId}")]
        public async Task<ActionResult<List<Queue>>> GetCustomerAppointments(string clientId)
        {
            var appointments = await _customerService.GetAppointments(clientId);

            if (appointments.Count == 0)
            {
                return NotFound(new { Message = "No upcoming appointments found for this customer." });
            }

            return Ok(appointments);
        }

        [HttpGet("~/api/history/client/{clientId}")]
        [HttpGet("history/{clientId}")]
        [HttpGet("getbyid/history/{clientId}")]
        public async Task<ActionResult<List<QueueHistory>>> GetCustomerHistory(string clientId)
        {
            var history = await _customerService.GetHistory(clientId);

            if (history.Count == 0)
            {
                return NotFound(new { Message = "No appointment history found for this customer." });
            }

            return Ok(history);
        }

        [HttpGet("~/api/clients/{clientId}")]
        [HttpGet("{clientId}")]
        public async Task<ActionResult<Customer>> GetCustomerDetails(string clientId)
        {
            var customer = await _customerService.GetCustomerDetails(clientId);

            if (customer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

            return Ok(customer);
        }

        [HttpPost("appointments/{customerId}")]
        public async Task<ActionResult<Queue>> PostAppointment(string customerId, [FromBody] UpdateAppointmentDto appointmentDto)
        {
            if (appointmentDto == null)
            {
                return BadRequest(new { Message = "Appointment data is required." });
            }

            try
            {
                var appointment = new Queue
                {
                    WorkerId = appointmentDto.WorkerId,
                    CustomerId = customerId,
                    TreatmentDescription = appointmentDto.TreatmentDescription,
                    Date = appointmentDto.Date
                };

                var createdAppointment = await _customerService.CreateAppointment(customerId, appointment);
                return Ok(createdAppointment);
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the appointment." });
            }
        }

        [HttpPut("~/api/appointments/update/{id}")]
        [HttpPut("appointments/{customerId}/{id}")]
        public async Task<IActionResult> PutAppointment(int id, [FromBody] UpdateAppointmentDto appointmentDto, string? customerId = null)
        {
            if (appointmentDto == null || string.IsNullOrWhiteSpace(appointmentDto.CustomerId ?? customerId))
            {
                return BadRequest(new { Message = "Appointment data is required." });
            }

            try
            {
                var clientId = appointmentDto.CustomerId ?? customerId!;
                var appointment = new Queue
                {
                    Id = id,
                    CustomerId = clientId,
                    WorkerId = appointmentDto.WorkerId,
                    TreatmentDescription = appointmentDto.TreatmentDescription,
                    Date = appointmentDto.Date
                };

                var isUpdated = await _customerService.UpdateAppointment(clientId, id, appointment);

                if (!isUpdated)
                {
                    return NotFound(new { Message = "Appointment not found for this customer." });
                }

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the appointment." });
            }
        }

        [HttpPut("~/api/clients/{id}")]
        [HttpPut("settings/{id}")]
        public async Task<IActionResult> PutCustomerSettings(string id, [FromBody] UpdateCustomerSettingsDto settingsDto)
        {
            if (settingsDto == null)
            {
                return BadRequest(new { Message = "Customer settings data is required." });
            }

            var currentCustomer = await _customerService.GetCustomerDetails(id);

            if (currentCustomer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

            try
            {
                var customer = new Customer
                {
                    CustomerId = id,
                    FirstName = settingsDto.FirstName ?? currentCustomer.FirstName,
                    LastName = settingsDto.LastName ?? currentCustomer.LastName,
                    Phone = settingsDto.Phone ?? currentCustomer.Phone,
                    Adress = settingsDto.Adress ?? currentCustomer.Adress,
                    Email = settingsDto.Email ?? currentCustomer.Email,
                    LastVisit = settingsDto.LastVisit ?? currentCustomer.LastVisit
                };

                await _customerService.UpdateCustomerSettings(id, customer);

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "An error occurred while updating customer settings." });
            }
        }

        [HttpPost("~/api/appointments/complete")]
        [HttpPost("appointments/{customerId}/{appointmentId}/complete")]
        public async Task<IActionResult> CompleteAppointment([FromBody] CompleteAppointmentDto appointmentDto, string? customerId = null, int? appointmentId = null)
        {
            if (appointmentDto == null
                || string.IsNullOrWhiteSpace(appointmentDto.CustomerId ?? customerId)
                || appointmentDto.AppointmentId.GetValueOrDefault(appointmentId ?? 0) == 0
                || string.IsNullOrWhiteSpace(appointmentDto.TreatmentDescription))
            {
                return BadRequest(new { Message = "Appointment id, customer id and treatment description are required." });
            }

            try
            {
                var clientId = appointmentDto.CustomerId ?? customerId!;
                var queueId = appointmentDto.AppointmentId ?? appointmentId!.Value;
                var isCompleted = await _customerService.CompleteAppointment(
                    clientId,
                    queueId,
                    appointmentDto.TreatmentDescription);

                if (!isCompleted)
                {
                    return NotFound(new { Message = "Appointment not found for this customer." });
                }

                return Ok(new { Message = "Appointment completed and moved to history." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "An error occurred while completing the appointment." });
            }
        }

        public class UpdateAppointmentDto
        {
            public string? CustomerId { get; set; }
            public string WorkerId { get; set; } = null!;
            public string TreatmentDescription { get; set; } = null!;
            public DateTime Date { get; set; }
        }

        public class UpdateCustomerSettingsDto
        {
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public string? Phone { get; set; }
            public string? Adress { get; set; }
            public string? Email { get; set; }
            public DateTime? LastVisit { get; set; }
        }

        public class CompleteAppointmentDto
        {
            public int? AppointmentId { get; set; }
            public string? CustomerId { get; set; }
            public string TreatmentDescription { get; set; } = null!;
        }
    }
}
