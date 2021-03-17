using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }
        
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [Authorize]
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var item = _context.Users.Find(-1);
            if (item == null)
            {
                return NotFound();
            } 
            else 
            {
                return Ok(item);
            }
        }

        [Authorize]
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var item = _context.Users.Find(-1);
            var itemToReturn = item.ToString();

            return itemToReturn;

        }
        [Authorize]
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return "This was a bad request !";

        }
    }

    
}