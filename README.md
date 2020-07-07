# Rubify Text
Rubify Text is a simple extension that wraps selected texts with `<ruby>` annotation tags to help make annotating Asian texts with furigana easier.

[![Preview](https://i.imgur.com/V14fRG8.gif)](https://i.imgur.com/V14fRG8.gif)

## Usage

### Rubifying Text
Select your text, then open the context menu (right click) and select "Rubify Text" to wrap your selected texts with `<ruby>` tags. 

You can also use **CTRL+ALT+T** instead of using the context menu.

#### Result
| Before Rubifying | After Rubifying |
| :--------------- | :-------------- |
| `時々`| `<ruby>時々<rt></rt></ruby>` |

After rubifiying the text, all you need to do is fill in the `<rt>` annotations.

### Derubifying Text
Select the text you want to convert from a `<ruby>` tag into plain text, then open the context menu and hover over "Derubify Text" to show a list of conversion options. Each option is listed below.

#### to `<ruby>` text
Converts the string into the text that is only inside of the `<ruby>` tag. (does not include `<rt>` texts)

| Before Derubifying | After Derubifying |
| :--------------- | :-------------- |
| `<ruby>時々<rt>ときどき</rt></ruby>`| `時々` |

#### to `<rt>` text
Converts the string into the text that is only inside of the `<rt>` tag. (does not include `<ruby>` texts)

| Before Derubifying | After Derubifying |
| :--------------- | :-------------- |
| `<ruby>時々<rt>ときどき</rt></ruby>`| `ときどき` |

#### to two strings
Returns two separate strings based on the two prior options separated by a bar `|`.

| Before Derubifying | After Derubifying |
| :--------------- | :-------------- |
| `<ruby>時々<rt>ときどき</rt></ruby>`| `時々｜ときどき` |
