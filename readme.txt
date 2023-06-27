If there is an error like this while compiling the question1.ts file:

Property 'startsWith' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
      if (match.startsWith('#')) 

To fix this just add or modify the compilerOptions property in tsconfig.json file to include "lib": ["es2016"] or any latest version.