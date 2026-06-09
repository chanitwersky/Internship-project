using System.Text.Json.Serialization;

namespace project.Dtos.Auth;

public class LoginRequest
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }
}
