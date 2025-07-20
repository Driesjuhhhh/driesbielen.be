#  Interacting with related Data

**Wat is een "object graph"?**

Een graph is een object (bijv. Author) samen met alle andere objecten (zoals Books) die eraan verbonden zijn via eigenschappen (navigatie).

* Voorbeeld: Een Author met een lijst van Books is een object graph.
* Elk object in de graph kan de “kop” zijn (het startpunt).

```
// Add new author + their books
var author = new Author {
    Name = "George Orwell",
    Books = new List<Book> {
        new Book { Title = "1984" },
        new Book { Title = "Animal Farm" }
    }
};

context.Authors.Add(author); // start tracking the entire graph
context.SaveChanges();
```
Hier voeg je een geheel nieuwe object graph toe: één Author met meerdere Books.

**Tip: Elk object kan het beginpunt van een graph zijn**

```
var book = new Book {
    Title = "Brave New World",
    Author = new Author { Name = "Aldous Huxley" }
};

context.Books.Add(book);
context.SaveChanges();
```

**Wat doet .Include()?**

Met .Include() zeg je tegen EF Core:
* "Haal ook de gerelateerde gegevens op in één query".

Zonder .Include() worden gerelateerde gegevens niet automatisch geladen (lazy loading werkt alleen als het apart is geconfigureerd).

```
using Microsoft.EntityFrameworkCore;

var authorsWithBooks = context.Authors
    .Include(a => a.Books)
    .ToList();

foreach (var author in authorsWithBooks)
{
    Console.WriteLine($"Auteur: {author.Name}");
    foreach (var book in author.Books)
    {
        Console.WriteLine($"  Boek: {book.Title}");
    }
}
```

**Meerdere Includes**

```
var authors = context.Authors
    .Include(a => a.Books)
    .Include(a => a.ContactInfo)
    .ToList();
```

```
var authors = context.Authors
    .Include(a => a.Books)
        .ThenInclude(b => b.BookJacket)
    .ToList();
```

**Wat is Eager Loading?**

Eager loading betekent: je haalt hoofdtabel + gerelateerde tabellen op in één query met .Include().

**Anonieme object maken**

```
var result = context.Authors
    .Select(a => new
    {
        a.AuthorId,
        FullName = a.FirstName[0] + ". " + a.LastName
    })
    .ToList();
```

```
var authors = context.Authors
    .Select(a => new
    {
        a.AuthorId,
        a.LastName,
        BookCount1900s = a.Books.Where(b => b.PublishDate.Year < 2000).Count()
    })
    .ToList();
```

**Wat als je het resultaat buiten de methode nodig hebt?**

```
public class AuthorProjection
{
    public int AuthorId { get; set; }
    public string FullName { get; set; }
    public int BookCount { get; set; }
}
```
```
var authors = context.Authors
    .Select(a => new AuthorProjection
    {
        AuthorId = a.AuthorId,
        FullName = a.FirstName[0] + ". " + a.LastName,
        BookCount = a.Books.Count
    })
    .ToList();
```

**Explicit loading (duidelijk aangeven wat je wil)**

```
var book = context.Books.First(b => b.BookId == 1);

context.Entry(book)
    .Reference(b => b.Author)
    .Load();
```
Of voor een collectie:
```
var author = context.Authors.First(a => a.AuthorId == 1);

context.Entry(author)
    .Collection(a => a.Books)
    .Load();
```

##  Gerelateerde data aanpassen (modificatie)

Scenario: alles wordt getrackt (EF volgt je objecten)

```
var author = context.Authors.Include(a => a.Books).First(a => a.Id == 1);
author.Books.First().BasePrice = 19.99;

context.SaveChanges(); // EF ziet wat je aangepast hebt
```

Scenario: object is niet getrackt (bijv. los van de database bewerkt)

```
// Eerste context
var book = context.Books.First(b => b.Id == 10);
book.BasePrice = 15.99;

// Nieuwe context
using var newContext = new BookContext();
newContext.Books.Update(book); // EF markeert hele graph als Modified!
newContext.SaveChanges();
```
⚠️ Alles (ook Author) wordt als "gewijzigd" gemarkeerd.

💡 Oplossing: gebruik Entry() met expliciete status:

```
newContext.Entry(book).State = EntityState.Modified;
newContext.SaveChanges(); // Alleen book wordt geüpdatet
```