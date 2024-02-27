# Notes Page

## Terms to know

- technology stack: The collection of technologies that you use to create or deliver your web application
- Web framework: Usually at the top of the stack. Examples includes possibilities such as Angular, React, Vue, or Svelte

## Hypertext Markup Language (HTML)

Started in 1980 by Starting in 1980. and is the basic structure of web pages.

## URL & HTTP

Stands for Uniform Resource Locator and HyperText Transfer Protocol respectively. Both specify how web documents are addressed and transmitted across the Internet. 

## CSS

Stands for Cascading Style Sheets. Created by Håkon Wium Lie. Stabliphes the look for webpages.

## Javascript 

Created (or creation lead by) Brendan Eich. Establishes the behavior of web pages. In 1996 Netscape turned control of JavaScript over to ECMA. Oficially, Javascript is EXCMAscript but is more known as Javascript

In 2009 Ryan Dahl created Node.js as the first successful application for deploying JavaScript outside of a browser. This changed the mindset of JavaScript as purely a browser technology to one that is leveraged across an entire technology stack.

Other important milestones in the history of JavaScript include the 2013 standardization of the common object notation JSON, a typed variant named TypeScript in 2012, and the introduction of numerous transpilers for converting other languages into compatible ECMAScript.


### Javascript Primitive types 

Null	The type of a variable that has not been assigned a value.
Undefined	The type of a variable that has not been defined.
Boolean	true or false.
Number	A 64-bit signed number.
BigInt	A number of arbitrary magnitude.
String	A textual sequence of characters.
Symbol	A unique value.

### Javascript Objects

Object	A collection of properties represented by name-value pairs. Values can be of any type.	{a:3, b:'fish'}
Function	An object that has the ability to be called.	function a() {}
Date	Calendar dates and times.	new Date('1995-12-17')
Array	An ordered sequence of any type.	[3, 'fish']
Map	A collection of key-value pairs that support efficient lookups.	new Map()
JSON	A lightweight data-interchange format used to share information across programs.	{"a":3, "b":"fish"}

### Operators

Similar to other languages. HOWEVER Javascript for comparision is for better practice to use === instead of ==

### Type conversions

Just Remember Javascript is wack. For example

2 + '3';
// OUTPUT: '23'
2 * '3';
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN

1 == '1';
// OUTPUT: true
null == undefined;
// OUTPUT: true
'' == false;
// OUTPUT: true

1 === '1';
// OUTPUT: false
null === undefined;
// OUTPUT: false
'' === false;
// OUTPUT: false

### Loops

For in 

The for in statement iterates over an object's property names.

const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
For arrays the object's name is the array index.

const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1

For of 

The for of statement iterates over an iterable's (Array, Map, Set, ...) property values.

const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'


### Functions 

Examples of junctions in javascript 

function hello(who) {
  return 'hello ' + who;
}

This is an Anonymous function 

const add = function (a, b) {
  return a + b;
};

Remember higher level? functions 

This is an arrow / lamda function 

() => 3;


### Arrays and its functions

Ones that I might forget that they exist or waht they do
push and pop - they target the END of the array
values - Creates an iterator for use with a for of loop
reduce	- Run a function to reduce each array item to a single item	
map -	Run a function to map an array to a new array
every	- Run a function to test if all items match	a.every(i => i < 3)
some - Run a function to test if any items match

### JSON

Effective to share and store data. 

Uses types of string, number, boolean, array, object, null

Example of a JSON doc 

{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}

may convert JSON to JS with the functions JSON.parse and JSON.stringify

### CLasses 

Can make things private in a class with a # as a prefix

### Rest 

Makes it possible to have different number of parameters with a function. Works with ... 

function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true

### Spread 

Literally does the opposite of rest. It returns an object. So you give it an array or a string and it breaks it down for parameters for a function 

function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}


## Varios things 

### Commands to know

Console commands

echo - Output the parameters of the command
cd - Change directory
mkdir - Make directory
rmdir - Remove directory
rm - Remove file(s)
mv - Move file(s)
cp - Copy files
ls - List files
curl - Command line client URL browser
grep - Regular expression search
find - Find files
top - View running processes with CPU and memory usage
df - View disk statistics
cat - Output the contents of a file
less - Interactively output the contents of a file
wc - Count the words in a file
ps - View the currently running processes
kill - Kill a currently running process
sudo - Execute a command as a super user (admin)
ssh - Create a secure shell on a remote computer
scp - Securely copy files to a remote computer
history - Show the history of commands
ping - Check if a website is up
tracert - Trace the connections to a website
dig - Show the DNS information for a domain
man - Look up a command in the manual

| - Take the output from the command on the left and pipe, or pass, it to the command on the right
> - Redirect output to a file. Overwrites the file if it exists
>> - Redirect output to a file. Appends if the file exists

CTRL-R - Use type ahead to find previous commands
CTRL-C - Kill the currently running command


For VI command mode 
:h	      help
i	      enter insert mode. This will allow you to type and delete text. Use ESC to exit insert mode. No other commands will work while in insert mode.
u	      undo
CTRL-r	  redo
gg	      go to beginning of file
G	      go to end of file
/	      search for text that you type after /
n	      next search match
N	      previous search match
v	      visually select text
y	      yank or copy selected text to clipboard
p	      paste clipboard
CTRL-wv	  Split window vertically
CTRL-ww	  Toggle windows
CTRL-wq	  Close current window
:e	      Open a file. Type ahead available. If you open a directory you can navigate it in the window
:w	      write file (save)
:q	      quit. Use :q! to exit without saving

### What is Caddy? 

Caddy is a web service that listens for incoming HTTP requests. Caddy then either serves up the requested static files or routes the request to another web service. This ability to route requests is called a gateway, or reverse proxy, and allows you to expose multiple web services (i.e. your project services) as a single external web service (i.e. Caddy).

### Web certificates 

Web certificates are generated by a trusted 3rd party using public/private key encryption. Verifies that the domain user actually owns the rights for the domain. 

