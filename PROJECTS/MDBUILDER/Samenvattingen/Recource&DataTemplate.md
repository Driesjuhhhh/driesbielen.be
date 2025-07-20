# Recources and DataTemplate and DI

## XAML Resources

Resources zijn `herbruikbare objecten (zoals stijlen, pens, brushes, converters…)` die je centraal definieert in een `ResourceDictionary `.

Elke resource krijgt een unieke sleutel (x:Key) en kan worden gebruikt met de {StaticResource} markup.

**Hier zie je een voorbeeld van hoe je gegevens ophaalt**

```
<!-- MainWindow.xaml -->
<Grid Background="{StaticResource PrimaryColor}">
    <TextBlock Text="Welkom!" />
</Grid>
```

Je kunt resources definiëren in App.xaml via de Application.Resources-eigenschap.

➡️ Deze resources zijn dan overal in de applicatie beschikbaar, ongeacht welke Window, UserControl of Page je opent.

**Hier zie je een voorbeeld van een merge resource directories**

```
<!-- App.xaml -->
<Application x:Class="MyApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Styles.xaml" />
                <ResourceDictionary Source="Colors.xaml" />
                <ResourceDictionary Source="Converters.xaml" />
            </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
    </Application.Resources>

</Application>
```

In WPF kun je resources organiseren in aparte XAML-bestanden (resource dictionaries), zodat je project netjes en overzichtelijk blijft.
* Je plaatst herbruikbare stijlen, pens, converters… in een eigen .xaml-bestand.
* Dit bestand wordt dan ingeladen in App.xaml via een MergedDictionaries-verzameling.

**Hier zie je een voorbeeld van app.xaml**

```
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
    <SolidColorBrush x:Key="HeaderColor" Color="DarkBlue" />
</ResourceDictionary>
```

## Flexible content model

### ContentControl vs. ItemsControl in WPF

**ContentControl**
* Bijv. Button, Label, CheckBox, Window
* Heeft één Content-eigenschap (object)

➕ Meer controle nodig? → gebruik een DataTemplate via ContentTemplate

```
<Label Content="{Binding SelectedCustomer}" ContentTemplate="{StaticResource CustomerTemplate}" />
```

**ItemsControl**
* Bijv. ListView, ComboBox, TabControl
* Heeft een ItemsSource-eigenschap met een collectie

➕ Gebruik een ItemTemplate voor aangepaste weergave

```
<ListBox ItemsSource="{Binding Customers}" ItemTemplate="{StaticResource CustomerTemplate}" />
```

```
<Window.Resources>
    <DataTemplate x:Key="CustomerTemplate">
        <StackPanel Orientation="Horizontal">
            <TextBlock Text="{Binding FirstName}" Margin="5"/>
            <TextBlock Text="{Binding LastName}" Margin="5"/>
        </StackPanel>
    </DataTemplate>
</Window.Resources>
```

of public override string ToString() => FirstName + " " + Lastname in model;

![alt text](images/image-11.png)

### Wordt uitgelegd met voorbeeld op andere pagina en geeft een voorbeeld met meerdere schermen **!!!**

Een `Implicit DataTemplate` is een DataTemplate die je als resource definieert zonder x:Key, maar met een DataType.
* Gebruik `DataType="{x:Type YourClass}"` om aan te geven voor welk type object de template geldt.
* Wordt automatisch toegepast wanneer een object van dat type wordt weergegeven in bijv. een ContentControl of ItemsControl.
* Vervangt standaard de ToString()-weergave.

## Dependendy Injection

Dependency Injection (DI) is een ontwerpprincipe dat helpt bij het beheren van afhankelijkheden tussen objecten, waardoor je code losser gekoppeld en beter testbaar wordt.

**Stappen voor het implementeren van een dependency injectie** 

Om Dependency Injection (DI) te gebruiken in een WPF-applicatie:

* `Verwijder StartupUri uit App.xaml.`
* `Override OnStartup in App.xaml.cs` om de MainWindow handmatig te maken.
* Gebruik het NuGet-pakket `Microsoft.Extensions.DependencyInjection` om dependencies te injecteren in MainWindow en ViewModels.


 MainWindow.xaml.cs (gebruik DI)

 ```
 public partial class MainWindow : Window
{
    public MainWindow(MainViewModel viewModel)
    {
        InitializeComponent();
        DataContext = viewModel;
    }
}
```

### Voor de rest is het gewoon demo dus kijk in pdf