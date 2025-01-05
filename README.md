<h1>
Modifies "Copy" button of code block to copy without comments.
</h1>

<h2>
Original code with comments:
</h2>

```
using System;

class Program
{
    // This is a single-line comment.
    static void Main()
    {
        int a = 5;  // Inline comment: Declaration of 'a'
        int b = 10; // Inline comment: Declaration of 'b'

        /*
         * This is a multi-line comment.
         * Declaring 'sum'.
         */
        int sum = a + b;

        /// <summary>
        /// XML summary comment for documentation.
        /// </summary>
        Console.WriteLine("The sum of " + a + " and " + b + " is: " + sum); // Print sum
    }
}
```
<h2>
Copied Code (without comments):
</h2>

```
using System;
class Program
{
    static void Main()
    {
        int a = 5;  
        int b = 10; 
        int sum = a + b;
        Console.WriteLine("The sum of " + a + " and " + b + " is: " + sum); 
    }
}
```
