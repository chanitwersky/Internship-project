using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services;

public static class DatabaseSchemaService
{
    public static async Task EnsureWorkerProfileColumnsAsync(Datamanager context)
    {
        await context.Database.ExecuteSqlRawAsync(@"
            IF NOT EXISTS (
                SELECT 1 FROM sys.columns
                WHERE object_id = OBJECT_ID(N'Workers') AND name = 'name'
            )
            BEGIN
                ALTER TABLE Workers ADD name NVARCHAR(100) NULL;
            END
        ");

        await context.Database.ExecuteSqlRawAsync(@"
            UPDATE Workers
            SET name = LTRIM(RTRIM(ISNULL(firstName, '') + ' ' + ISNULL(lastName, '')))
            WHERE name IS NULL OR LTRIM(RTRIM(name)) = '';
        ");
    }
}
