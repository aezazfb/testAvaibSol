using Microsoft.AspNetCore.Mvc;
using testAvaib.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
		public IActionResult Get()
		{
			var stds = dbContext.StdMarks.ToList();
			return Ok(stds);
		}

		// GET api/<MarksController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var name = dbContext.StdMarks.Where(st => st.Id == id).FirstOrDefault();
			return Ok(name);
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
		public IActionResult Put(int id, [FromBody] StdMarks value)
		{
			var std = dbContext.StdMarks.Where(i => i.Id == id).FirstOrDefault();
			if (std is not null)
			{
				dbContext.Entry(std).State = EntityState.Modified;
				dbContext.SaveChanges();
				return Ok(true);
			}
			return BadRequest(false);
		}

		// DELETE api/<MarksController>/5
		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var std = dbContext.StdMarks.Where(i => i.Id == id).FirstOrDefault();
			if (std is not null)
			{
				dbContext.Remove(std);
				dbContext.SaveChanges();
				return Ok(true);
			}
			return BadRequest(false);
		}
	}
}
