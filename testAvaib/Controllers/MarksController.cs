using Microsoft.AspNetCore.Mvc;
using testAvaib.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace testAvaib.Controllers
{
	[ApiController]
	[Route("marks")]
	public class MarksController : ControllerBase
	{
		MarksDbContext dbContext;
		public MarksController(MarksDbContext marksDbContext)
		{
			dbContext = marksDbContext;
		}

		// GET: api/<MarksController>
		[HttpGet]
		public string Get()
		{
			var name = dbContext.StdMarks.Where(st => st.Name == "ax").FirstOrDefault().Name ?? "Nhi Mila";
			return name;
		}

		// GET api/<MarksController>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			var name = dbContext.StdMarks.Where(st => st.Name == "ax").FirstOrDefault().Name ?? "Nhi Mila";
			return name;
			//return "value";
		}

		// POST api/<MarksController>
		[HttpPost]
		public IActionResult Post([FromBody] MarksModel value)
		{
			StdMarks model = new StdMarks();
			model.Name = value.fullName;
			model.Marks = value.marksObt;
			model.Pass = value.passed;
			model.FeePaid = value.feePaid;
			var id = dbContext.StdMarks.Add(model);
			dbContext.SaveChanges();
			return Ok(id);
		}

		// PUT api/<MarksController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<MarksController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
