using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ItemModelCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "c_name",
                table: "t_users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "t_items",
                columns: table => new
                {
                    c_id = table.Column<Guid>(type: "uuid", nullable: false),
                    c_title = table.Column<string>(type: "text", nullable: false),
                    c_description = table.Column<string>(type: "text", nullable: false),
                    c_category = table.Column<string>(type: "text", nullable: false),
                    c_size = table.Column<string>(type: "text", nullable: false),
                    c_condition = table.Column<string>(type: "text", nullable: false),
                    c_pointsrequired = table.Column<int>(type: "integer", nullable: false),
                    c_coverimageurl = table.Column<string>(type: "text", nullable: true),
                    c_imageurls = table.Column<List<string>>(type: "text[]", nullable: true),
                    c_isavailable = table.Column<bool>(type: "boolean", nullable: false),
                    c_isapproved = table.Column<bool>(type: "boolean", nullable: false),
                    c_userid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_t_items", x => x.c_id);
                    table.ForeignKey(
                        name: "fk_t_items_users_c_userid",
                        column: x => x.c_userid,
                        principalTable: "t_users",
                        principalColumn: "c_userid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_t_items_c_userid",
                table: "t_items",
                column: "c_userid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_items");

            migrationBuilder.DropColumn(
                name: "c_name",
                table: "t_users");
        }
    }
}
