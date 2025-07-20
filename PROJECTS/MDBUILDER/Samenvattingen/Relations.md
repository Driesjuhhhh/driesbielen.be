# OneToMany

## Hoe EF Core mappings bepaalt

EF Core gebruikt conventies om klassen automatisch te vertalen naar tabellen:
* Klasse = tabel
* Eigenschap = kolom
* Id of < ClassName>Id = primaire sleutel

Maar: dit is aanpasbaar via:
* Fluent API (aanbevolen): in OnModelCreating
* Data Annotations: met [Key], [MaxLength], enz.

**Voorbeeld: primaire sleutel en max lengte**

```
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Author>()
        .HasKey(a => a.AuthorId); // Primary Key

    modelBuilder.Entity<Author>()
        .Property(a => a.LastName)
        .HasMaxLength(100); // Max length
}
```

## Visualiseren van mappings met EF Core Power Tools

1. Installeer EF Core Power Tools
2. Rechtsklik op project → EF Core Power Tools → Add DbContext Diagram
3. Tool toont visueel:
    * Tabellen, relaties, sleutels
    * Navigatie-eigenschappen (bijv. 1:* relaties)

**Opgelet!!!** Je hebt Microsoft.EntityFrameworkCore.Design nodig in je project.

## Relaties instellen (One-to-Many)

**Voorbeeld: 1 auteur heeft meerdere boeken:**

```
public class Author
{
    public int AuthorId { get; set; }
    public string Name { get; set; }

    public List<Book> Books { get; set; } = new(); // Navigatie
}

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }

    // Deze property mag je weglaten, EF Core maakt een shadow property
    public int AuthorId { get; set; } // Foreign key
    // Deze navigatie mag er zijn, maar is NIET verplicht
    public Author Author { get; set; } // Navigatie
}
```

**In OnModelCreating() kan je dat nog explicieter doen:**
```
modelBuilder.Entity<Book>()
    .HasOne(b => b.Author)
    .WithMany(a => a.Books)
    .HasForeignKey(b => b.AuthorId);
```

**Gegevens seeden met relaties**
```
modelBuilder.Entity<Author>().HasData(
    new Author { AuthorId = 1, Name = "J.K. Rowling" });

modelBuilder.Entity<Book>().HasData(
    new Book { BookId = 1, Title = "Harry Potter", AuthorId = 1 });
```

**Soorten scenaio's voo het opstellen van OntoMany relatie**

**Scenario 1**: Alleen navigatie in ouder

```
public class Author
{
    public int AuthorId { get; set; }
    public string Name { get; set; }

    public List<Book> Books { get; set; } = new();
}

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }
}
```
* EF Core herkent: één Author heeft meerdere Books
* Voegt shadow property AuthorId toe aan Book-tabel in de database

**Scenario 2**: Kind verwijst naar ouder (navigatie-eigenschap)

```
public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }

    public Author Author { get; set; }
}
```
* Nu kun je van Book naar Author navigeren in de code
* EF Core herkent nog steeds automatisch de relatie

**Scenario 3**: Kind bevat foreign key (FK)

```
public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }

    public int AuthorId { get; set; }  // FK naar Author
}
```
* EF Core koppelt AuthorId automatisch aan de juiste Author
* Voorwaarde: de naam AuthorId komt overeen met de conventie (ParentType + Id)

**Scenario 4**: Kind heeft navigatie + foreign key

```
public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }

    public int AuthorId { get; set; }  // FK
    public Author Author { get; set; } // Navigatie
}
```
* Dit is het meest expliciete en `vaakst gebruikte scenario`

**Belangrijke opmerking**

Als je afwijkt van conventienamen (bijv. WriterKey i.p.v. AuthorId), dan moet je de relatie expliciet configureren met Fluent API:

```
modelBuilder.Entity<Book>()
    .HasOne(b => b.Author)
    .WithMany(a => a.Books)
    .HasForeignKey(b => b.WriterKey); // afwijkende naam
```

## Geen Detecteerbare Relatie – Wat Gaat er Mis?


Alleen Foreign Key in kind zonder navigatie in ouder

```
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }

    public int AuthorId { get; set; } // FK zonder navigatie
}
public class Author
{
    public int Id { get; set; }
    public string Name { get; set; }

    // Geen List<Book> aanwezig
}
```

* EF Core detecteert geen relatie! Want: EF Core verwacht minimaal een List<Book> in Author om het als een One-to-Many relatie te herkennen

**Oplossing: Custom Fluent Mapping gebruiken**

```
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Book>()
        .HasOne<Author>()             // Eén Author
        .WithMany()                   // Heeft veel Books, maar we geven géén property op
        .HasForeignKey(b => b.AuthorId); // Foreign key op Book
}
```
**Waarom zou je toch met een Foreign key Id werken**

1. EF Core kan soms een FK afleiden (shadow property), maar je hebt meer controle met een expliciete property.
2. Zonder een AuthorId in Book, kun je geen HasData() gebruiken voor Books
3. Je kunt rechtstreeks via de ID koppelen, zonder het object op te halen
4. Je moet het hele parent-object (bv. Author) inladen om een child (Book) eraan te koppelen.

**Wat gebeurt er als je géén AuthorId invult?**

```
var book = new Book { Title = "Untitled Book" };
context.Books.Add(book);
context.SaveChanges(); // ❗ Dit zal een fout geven
```

* EF Core stuurt een AuthorId = 0 naar de database.
* Omdat de kolom AuthorId niet nullable is, geeft de database een foreign key constraint violation.

**Maak foreign key optioneel**

```
modelBuilder.Entity<Book>()
    .HasOne(b => b.Author)
    .WithMany(a => a.Books)
    .HasForeignKey(b => b.AuthorId)
    .IsRequired(false); // maakt de FK optioneel
```

# ManytoMany & OneToOne

## Many-To-Many

**Wat is een Many-to-Many Relatie?**

Een many-to-many relatie betekent:
* Eén artist kan meerdere book covers ontwerpen, en één book cover kan door meerdere artists ontworpen zijn.

**EF Core: 4 manieren om Many-to-Many te maken**

| Methode                      | Wat is het?                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| ✅ **Skip navigations**       | Meest gebruikt. Geen aparte klasse voor de relatie nodig.                    |
| ➕ Met **payloads**           | Zelfde als skip nav., maar je voegt extra info toe aan de relatie (bv. rol). |
| 🛠️ **Explicit join entity** | Je maakt handmatig een klasse zoals `ArtistCover` met extra kolommen.        |
| 🔁 **Unidirectional**        | Alleen één kant (bv. alleen van Artist naar Covers, niet omgekeerd).         |


### Skip Navigations – Meest gebruikt

```
public class Artist
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<Cover> Covers { get; set; } = new();
}

public class Cover
{
    public int Id { get; set; }
    public string Title { get; set; }

    public List<Artist> Artists { get; set; } = new();
}
```

```
public DbSet<Artist> Artists { get; set; }
public DbSet<Cover> Covers { get; set; }
```
**Als leerkracht vraagt voor tabellen te joinen met een may to many relatie**
```
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Artist>()
        .HasMany(a => a.Covers)
        .WithMany(c => c.Artists)
        .UsingEntity<Dictionary<string, object>>(
            "ArtistCover", // naam van de join-tabel
            join => join.HasOne<Cover>()
                        .WithMany()
                        .HasForeignKey("CoverId")
                        .OnDelete(DeleteBehavior.Cascade),
            join => join.HasOne<Artist>()
                        .WithMany()
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade),
            join =>
            {
                join.HasKey("ArtistId", "CoverId"); // samengestelde sleutel
                join.ToTable("ArtistCovers"); // optioneel: naam van de tabel
            });
}
```

```
 modelBuilder.Entity<Artist>()
        .HasMany(a => a.Covers)
        .WithMany(c => c.Artists);
```

EF Core maakt automatisch een tussentabel met ArtistId en CoverId – zonder dat jij die moet aanmaken.

![alt text](images/image-14.png)

## One-To-One

```
public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }

    public Cover Cover { get; set; }  // navigation to dependent
}

public class Cover
{
    public int CoverId { get; set; }
    public string Design { get; set; }

    public int BookId { get; set; }         // foreign key
    public Book Book { get; set; }          // navigation to principal
}
```

```
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Book>()
        .HasOne(b => b.Cover)
        .WithOne(c => c.Book)
        .HasForeignKey<Cover>(c => c.BookId);
}
```