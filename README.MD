[![Build Status](https://travis-ci.org/yc-ionic/cached-get.svg?branch=master)](https://travis-ci.org/yc-ionic/cached-get.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-ionic/cached-get/badge.svg?branch=master)](https://coveralls.io/github/yc-ionic/cached-get?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# @yci/cached-get

## Installation

1. Install the Ionic plugin
```
 npm i -S @yci/cached-get
```

2. Add it to your app’s NgModule.

```typescript
// Import your library
import { CachedGetModule } from '@yci/cached-get';

@NgModule({

  ...

  imports: [

    ...

    // Specify your library as an import
    CachedGetModule.forRoot()
  ],
  
  ...

})
export class AppModule { }
```

## Usage
Once your library is imported, you can use its service in your Angular application:

```ts
import { CachedGet } from '@yci/cached-get';
import 'rxjs/add/operator/map';

constructor(private cg: CachedGet) {

  cg.get('http://example.com/xxx')
    .map(x => JSON.stringify(x))
    .subscribe(x => {
      // do your stuff
    }, e => {
      // handle errors
    });

  // with custom headers
  cg.get('http://example.com/xxx', { 'Content-type': 'xxx' })
    .map(x => JSON.stringify(x))
    .subscribe(x => {
      // do your stuff
    }, e => {
      // handle errors
    });

}
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

## License

MIT © [Yu Chen](mailto:yu.chen@live.ie)
