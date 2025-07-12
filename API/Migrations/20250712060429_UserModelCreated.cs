using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UserModelCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "t_users",
                columns: table => new
                {
                    c_userid = table.Column<Guid>(type: "uuid", nullable: false),
                    c_email = table.Column<string>(type: "text", nullable: false),
                    c_password = table.Column<string>(type: "text", nullable: false),
                    c_address = table.Column<string>(type: "text", nullable: false),
                    c_isactive = table.Column<bool>(type: "boolean", nullable: false),
                    c_role = table.Column<string>(type: "text", nullable: false),
                    c_imageurl = table.Column<string>(type: "text", nullable: false),
                    c_points = table.Column<int>(type: "integer", nullable: false),
                    c_createddate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_t_users", x => x.c_userid);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_users");
        }
    }
}
