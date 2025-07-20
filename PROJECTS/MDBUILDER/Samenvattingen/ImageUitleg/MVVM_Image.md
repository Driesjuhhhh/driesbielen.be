![alt text](/images/image-7.png)

## Stap 1: We beginnen met een model

```
public class Customer
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```

Dit stelt de data voor → de rechterkant in de afbeelding ("Model").

## Stap 2: DataProvider: CustomerDataProvider.cs

```
using System.Collections.Generic;

public class CustomerDataProvider
{
    public List<Customer> GetAllCustomers()
    {
        return new List<Customer>
        {
            new Customer { FirstName = "Alice", LastName = "Johnson" },
            new Customer { FirstName = "Bob", LastName = "Smith" }
        };
    }
}
```

De DataProvider levert de lijst klanten op → blokje rechtsonder.

het is een soort "**lichte" repository (of mock repository)**, maar zonder echte data-opslag.

## Stap 3 – ViewModel: CustomersViewModel.cs

```
using System.Collections.ObjectModel;

public class CustomersViewModel
{
    public ObservableCollection<Customer> Customers { get; set; }

    private CustomerDataProvider dataProvider;

    public CustomersViewModel()
    {
        dataProvider = new CustomerDataProvider();
        LoadAsync();
    }

    public void LoadAsync()
    {
        var customersFromProvider = dataProvider.GetAllCustomers();
        Customers = new ObservableCollection<Customer>(customersFromProvider);
    }
}
```

Dit is je ViewModel:

* **Customers** is de lijst die de View toont
* **LoadAsync()** haalt data op uit de provider

## Stap 4 – View: MainWindow.xaml

![alt text](/images/image-8.png)

```
<Window x:Class="MyApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:local="clr-namespace:MyApp"
        Title="MVVM Demo" Height="300" Width="400">

    <Window.DataContext>
        <local:CustomersViewModel />
    </Window.DataContext>

    <Grid>
        <ListView ItemsSource="{Binding Customers}">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <StackPanel Orientation="Horizontal">
                        <TextBlock Text="{Binding FirstName}" Margin="5"/>
                        <TextBlock Text="{Binding LastName}" Margin="5"/>
                    </StackPanel>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
    </Grid>
</Window>
```

**Wat gebeurd hier**

```
<Window.DataContext>
    <local:CustomersViewModel />
</Window.DataContext>
```

* Dit stelt de DataContext van de volledige Window in.
* Dat betekent: alle bindings binnenin (zoals {Binding Customers}) gebruiken automatisch de CustomersViewModel als bron.

**Loaded event**

Kun je zien in de viewmodel zo is de loaded event opgehaald

```
public CustomersViewModel()
{
    dataProvider = new CustomerDataProvider();
    LoadAsync(); // automatisch bij het maken van de ViewModel
}
```