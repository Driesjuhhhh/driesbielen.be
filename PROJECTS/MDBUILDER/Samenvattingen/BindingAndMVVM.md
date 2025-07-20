# Binding and MVVM

## Markup Extensions in XAML

Een `Markup Extension` in XAML is een speciale syntaxis die wordt gebruikt om waarden in te stellen die niet eenvoudig als een string kunnen worden weergegeven. Ze worden herkend aan de accolades `{}` en bieden een manier om complexe objecten of gegevensbronnen te definiëren.

Voorbeelden van markup extensions zijn:

- **Binding**: `{Binding Path=Name}` om data binding in te stellen.
- **StaticResource**: `{StaticResource ResourceKey}` om een resource op te halen.
- **DynamicResource**: `{DynamicResource ResourceKey}` voor dynamische resources.

Markup extensions maken het mogelijk om declaratief en flexibel te werken in XAML, wat essentieel is voor het MVVM-patroon.

## Data binding basics

`Data binding` is een mechanisme waarmee je `gegevens verbindt aan UI-elementen`, zoals een TextBox die automatisch de waarde toont van de Name-eigenschap van een Employee-object.

**4 bouwstenen van data binding:**

1. **Bronobject** – het object waarin de data zit (bv. een lijst van klanten)
2. **Bron-eigenschap** – de specifieke eigenschap in dat object (bv. SelectedItem.Content)
3. **Doelobject (target)** – het UI-element dat de data toont (bv. een TextBox)
4. **Doel-eigenschap** – de eigenschap van het UI-element die je bindt (bv. Text)

`Als één van deze ontbreekt, werkt de binding niet.`

**Voorbeeld**

```
<TextBox Text="{Binding ElementName=customerListView, Path=SelectedItem.Content}" />
```

Als je een object als `DataContext instelt, kan je ElementName weglaten`:

* Bronobject = het object ingesteld als DataContext

## Direction of data flow

Richting van datastroom (Binding Mode):

* **OneWay**: alleen van bron → naar doel
(standaard voor meeste eigenschappen)
* **TwoWay**: in beide richtingen
(standaard voor TextBox.Text, CheckBox.IsChecked)
* **OneWayToSource**: alleen van doel → naar bron

![alt text](images/image-6.png)

 Wanneer wordt de bron bijgewerkt? (UpdateSourceTrigger):

 * **LostFocus (standaard bij TextBox.Text):** update gebeurt pas als de gebruiker het veld verlaat.

 ```
 <TextBox Text="{Binding Path=Name, Mode=TwoWay, UpdateSourceTrigger=LostFocus}" />
```
* **PropertyChanged**: update onmiddellijk bij elke wijziging.

```
<TextBox Text="{Binding Path=Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}" />
```

Hoe geef je aan wat de bron is?

* **Source**: stel een object rechtstreeks in (bv. via resources)
    * vb: staticresources
* **ElementName**: verwijs naar een ander XAML-element op naam
```
<Button x:Name="myButton" Content="Klik mij!" />

<TextBox Text="{Binding ElementName=myButton, Path=Content}" />
```
* **RelativeSource**: verwijs relatief, bv. Self (het element zelf) --> **Zeldzaam**

```
<Button Content="{Binding RelativeSource={RelativeSource Self}, Path=Name}" />
```

* Als je geen source opgeeft in een binding, gebruikt WPF automatisch de `DataContext`.
* Elke UI-element heeft een DataContext-eigenschap.

## MVVM

`MVVM (Model-View-ViewModel)` is een `architecturaal patroon` dat de `gebruikersinterface (UI) scheidt van de logica`, en maakt gebruik van `data binding`.

### Model

* Bevat de gegevens die de applicatie nodig heeft
* Wordt voorgesteld door een gewone C#-klasse met eigenschappen (zoals Name, Age, …)
* Geen UI-logica, puur data

```
public class Customer
{
    public string Name { get; set; }
}

```

### View

* Bevat de UI, geschreven in XAML
* Heeft meestal een lege code-behind (geen logica)
* Toont data via bindings naar de ViewModel

```
<Window x:Class="MyApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:local="clr-namespace:MyApp"
        Title="MVVM Demo">
    <Window.DataContext>
        <local:CustomerViewModel />
    </Window.DataContext>

    <Grid>
        <TextBlock Text="{Binding CurrentCustomer.Name}" />
    </Grid>
</Window>
```

### ViewModel

* Bevat de logica voor de UI (zoals knoppenacties, data ophalen)
* Is een gewone C#-klasse
* Heeft geen kennis van UI-elementen, maar stelt data en commando’s beschikbaar via bindings

```
public class CustomerViewModel
{
    public Customer CurrentCustomer { get; set; }

    public CustomerViewModel()
    {
        CurrentCustomer = new Customer { Name = "Alice" };
    }
}
```

![alt text](images/image-7.png)

## Zie andere samenvatting voor voorbeeld van deze afbeelding **!!!!**


### Voordelen van MVVM

* **Beter onderhoudbaar**: UI en logica zijn gescheiden, wat de code overzichtelijker maakt.
* **Goed testbaar**: de ViewModel bevat geen UI-elementen, waardoor je hem makkelijk kunt unit-testen als een gewone C#-klasse.

## Notify about property changes

**Wat doet INotifyPropertyChanged?**

Het is een interface met het event:

```
event PropertyChangedEventHandler? PropertyChanged;
```

* De UI (bindings) luistert automatisch naar dit event.
* Je roept PropertyChanged op wanneer je een eigenschap verandert, zodat de UI zich ververst.

Extra handig: [`CallerMemberName`]

Maakt het eenvoudiger om de naam van de veranderde eigenschap automatisch mee te geven, zonder die zelf te typen.

```
public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
```

Doe deze logica in een **viewmodelbase** klasse plaatsen

## Convert values in data binding

Een converter in binding zet data om tussen bron en doel.
Je gebruikt een klasse die IValueConverter implementeert.

* Convert: bij data van bron → naar UI
* ConvertBack: bij data van UI → naar bron (bij TwoWay-binding)

![alt text](images/image-9.png)

**Hoe set je een converter**

![alt text](images/image-10.png)

**Voorbeeld van een staticresource**

```
<!-- Customer list -->
<Grid Grid.Column="{Binding NavigationSide, 
                    Converter={StaticResource NavigationSideToGridColumnConv}}"
      Background="#777">
</Grid>
```

## Commands

In MVVM gebruik je `commands` om UI-acties (zoals knoppen klikken) af te handelen in de `ViewModel`, in plaats van met `event handlers in de code-behind.`

Een `DelegateCommand` is een herbruikbare implementatie van ICommand die je toelaat om logica (Execute & CanExecute) vanuit de `ViewModel` te koppelen aan knoppen in de UI

* Implementeert **ICommand**

Constructor accepteert:
* een Action voor **Execute** (wat er gebeurt)
* optioneel een Func<bool> voor **CanExecute** (wanneer het mag)
* RaiseCanExecuteChanged() **triggert dat de UI opnieuw CanExecute() evalueert (bv. knop aan/uit)**

**Gebruik**

in XAML

```
<Button Content="Save" Command="{Binding SaveCommand}" />
```
VieModel
```
public class MyViewModel
{
    public DelegateCommand SaveCommand { get; }

    private bool _canSave = false;
    public bool CanSave
    {
        get => _canSave;
        set
        {
            _canSave = value;
            SaveCommand.RaiseCanExecuteChanged(); // knop aan/uit
        }
    }

    public MyViewModel()
    {
        SaveCommand = new DelegateCommand(Save, () => CanSave);
    }

    private void Save()
    {
        // Opslaan gebeurt hier
    }
}
```

In WPF wordt een Command voornamelijk gebruikt bij:

| Element             | Toepassing                                    |
| ------------------- | --------------------------------------------- |
| 🟦 **Button**       | Meest gebruikt: `Command="{Binding ...}"`     |
| 📋 **MenuItem**     | Acties in menu's (`Copy`, `Save`, ...)        |
| 📎 **ContextMenu**  | Rechtermuisklik-acties                        |
| 🎚 **ToggleButton** | Bijv. om aan/uit logica te activeren          |
| ✅ **CheckBox**      | Soms bij specifieke logica, naast `IsChecked` |
