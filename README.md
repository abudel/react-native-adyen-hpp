
# react-native-adyen-hpp

## Getting started

`$ npm install react-native-adyen-hpp --save`

### Mostly automatic installation

`$ react-native link react-native-adyen-hpp`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-adyen-hpp` and add `RNAdyenHPP.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAdyenHPP.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAdyenHPPPackage;` to the imports at the top of the file
  - Add `new RNAdyenHPPPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-adyen-hpp'
  	project(':react-native-adyen-hpp').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-adyen-hpp/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-adyen-hpp')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAdyenHPP.sln` in `node_modules/react-native-adyen-hpp/windows/RNAdyenHPP.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Cl.Json.RNAdyenHPP;` to the usings at the top of the file
  - Add `new RNAdyenHPPPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAdyenHPP from 'react-native-adyen-hpp';

// TODO: What do with the module?
RNAdyenHPP;
```
  