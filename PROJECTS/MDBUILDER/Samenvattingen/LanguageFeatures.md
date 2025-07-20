# Language features

## Delegate

**Wat zijn delegate?**

Een delegate is een **type** dat `verwijst naar een methode.`

Je kan met een delegate een variabele aan maken. Die variabele kan dan worden aangeroepen alsof het een methode is.

```
public delegate void Writer(string message);
Writer writer = new Writer(logger.WriteMessage);
writer("Success!!");
```
In dit voorbeeld verwijst de writer-variabele naar de WriteMessage-methode van een Logger-object

Achter de schermen maakt de compiler een klasse aan (zoals Writer) die `erft van MulticastDelegate`, zodat meerdere methodes gekoppeld kunnen worden.

**Hoe gebruik je delegates?**

Eén subscriber:
```
NameChanged = OnNameChanged;
```
`Vervangt alle bestaande subscribers.`

Meerdere subscribers
```
NameChanged += OnNameChanged;
NameChanged += OnNameChanged2;
```
Verwijderen subscriber

```
NameChanged -= OnNameChanged;
```




## events

**Wat zijn events?**

Events zijn meldingen die een object (zoals een knop) kan uitzenden wanneer er iets gebeurt, zoals een klik. Andere stukken code kunnen zich op dat event abonneren en reageren wanneer het gebeurt.
![alt text](images/image-4.png)

**Belangrijke begippen in events**

* **Event** = aankondiging dat iets gebeurt.
* **Publisher** = de bron van het event (bijv. een knop).
* **Subscriber** = de code die reageert op het event.
* **Delegate** = maakt het technisch mogelijk om methodes aan variabelen te koppelen en ze later uit te voeren.

Voorbeeld code 

```
using System;

public class Button
{
    public delegate void ClickHandler();       // ✅ Delegate
    public event ClickHandler Click;           // ✅ Event

    public void SimuleerKlik()
    {
        Click?.Invoke();                       // ✅ Publisher roept event aan
    }
}

public class Program
{
    static void Main()
    {
        Button knop = new Button();
        knop.Click += () => Console.WriteLine("Knop werd geklikt!"); // ✅ Subscriber

        knop.SimuleerKlik(); // Simuleert een klik
    }
}

```
**ZEER belangrijk**

Een `event is een delegate met beperkingen`, bedoeld om veiliger gebruik toe te laten.

Het `event keyword` **voorkomt dat je per ongeluk alle subscribers overschrijft met =.**
 Alleen += en -= zijn toegestaan (om toe te voegen of te verwijderen).

 **Conventies**

 ```
 void EventHandler(object sender, EventArgs args);
```

object sender
* Verwijst naar het object dat het event uitstuurt

EventArgs args
* Bevat extra info over het event (zoals oude/nieuwe naam).
    * Moet een `klasse zijn die erft van EventArgs.`

**Voorbeeld**

```
public class NameChangedEventArgs : EventArgs
{
    public string OudeNaam { get; set; }
    public string NieuweNaam { get; set; }
}

public delegate void NameChangedHandler(object sender, NameChangedEventArgs args);
```

## Lambda

Een lambda-expressie is een manier om een methode inline te definiëren.

* Syntax: (parameters) => methodebody
* Parameters: tussen haakjes (), zonder types (de compiler leidt deze af).
    * Geen parameters? Gebruik lege haakjes ()
* => is de lambda-separator tussen parameters en de methode-inhoud.
* Methodebody: bevat de code; `zonder accolades als er maar één instructie is.`
* `Met accolades {} nodig bij meerdere regels code.`
* De returntype wordt ook automatisch afgeleid door de compiler.
    * Geen return nodig bij één regel code
    * Wel return + {} bij meerdere regels code

![alt text](images/image-1.png)

### Relatie tussen lambda’s en Action/Func

Lambda’s worden vaak gebruikt als argumenten voor delegates zoals Action en Func. Deze delegates bepalen het aantal parameters en het type resultaat dat de lambda moet hebben.

**Action< T>**

Aanvaardt parameter(s), maar geeft niets terug (void).

Voor meerdere parameters:
* Action<T1, T2>, Action<T1, T2, T3>, …

```
Action<string> print = name => Console.WriteLine("Hello " + name);
print("Alice"); // Output: Hello Alice
```

**Func<T, TResult>**

Aanvaardt parameter(s) en geeft een waarde terug (TResult).

Voor meerdere parameters:
* Func<T1, T2, TResult>, Func<T1, T2, T3, TResult>, …

```
Func<int, int> square = x => x * x;
int result = square(5); // result = 25
```

## Asynchronous programming

**Wat is het verschil tussen Synchronous werken en Asynchronous werken?**

* Synchronous werken: Taken worden één voor één uitgevoerd: eerst afronden, dan pas de volgende starten.
* Meerdere taken starten tegelijk, zonder te wachten.

**Wat is een Task?**

Een `Task is een manier om asynchroon code uit te voeren` — dat wil zeggen: je start een taak zonder dat je meteen wacht tot die klaar is. Hierdoor kan je programma meerdere dingen tegelijk doen.

Belangrijke kenmerken:
* Task = geen resultaat (zoals void).
* Task<TResult> = geeft een resultaat terug.

```
class Program
{
    static async Task Main()
    {
        Task<string> task = SayHelloAsync();
        Console.WriteLine("Even iets anders doen...");
        string result = await task;
        Console.WriteLine(result);
    }

    static async Task<string> SayHelloAsync()
    {
        await Task.Delay(1000); // Wacht 1 seconde
        return "Hallo van de async taak!";
    }
}
```
**Creating a Task**

Gebruik `Task.Run` om een taak te starten op een aparte thread.

De taak werkt asynchroon, dus de uitvoer kan in willekeurige volgorde gebeuren.

![alt text](images/image-2.png)

**Creating a Task< TResult>**

Een taak kan ook een waarde teruggeven, zoals een string of int.

Gebruik Task< TResult> en lees de waarde via `.Result.`

![alt text](images/image-3.png)

**Async en await**

Het `async` keyword geef je aan bij een methode die `await` gebruikt om asynchroon te kunnen werken.

Het `await` keyword pauzeert die methode tijdelijk tot een taak klaar is, zonder de rest van het programma te blokkeren.

**Conventies**

Heb je een methode gemaakt met async in gebruik dan eindigd de naam op op Async (vb. GetDataAsync()).

**Voorbeeld**

```
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        int length = await GetUrlContentLengthAsync();
        Console.WriteLine($"Lengte van website: {length}");
    }

    static async Task<int> GetUrlContentLengthAsync()
    {
        HttpClient client = new HttpClient();
        Task<string> getStringTask = client.GetStringAsync("https://example.com");

        DoIndependentWork();

        string contents = await getStringTask;
        return contents.Length;
    }

    static void DoIndependentWork()
    {
        Console.WriteLine("Even iets anders doen tijdens het wachten...");
    }
}
```

**Gebruik van tasks**

`Task.WhenAll(tasks)`
* Wacht op alle opgegeven taken en gaat dan verder.
    
    → Handig als je alles nodig hebt vóór je verdergaat.

`Task.WhenAny(tasks)`
* Wacht tot de eerste taak klaar is en gaat dan verder.

    → Handig als je snel wil reageren zodra iets klaar is.

```
var task1 = Task.Delay(2000);
var task2 = Task.Delay(1000);

await Task.WhenAll(task1, task2); // Wacht tot beide klaar zijn
await Task.WhenAny(task1, task2); // Wacht tot één van de twee klaar is
```
