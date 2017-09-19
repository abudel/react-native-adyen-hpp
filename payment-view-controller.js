import { NativeModules, processColor } from 'react-native';

const { RNAdyenHPP } = NativeModules;

export const show = async (options) => {
    if (options && options.tintColor) {
      options.tintColor = processColor(options.tintColor)
    }
    if (options && options.barTintColor) {
      options.barTintColor = processColor(options.barTintColor)
    }

    return new Promise((resolve, reject) => {
        RNAdyenHPP.show(options, (error) => {
            if (error) {
                return reject(error);
            }
            resolve(true);
        })
    })

}

export const dismiss = () => {
    RNAdyenHPP.dismiss()
}

export const isAvailable = async () => {
    return new Promise((resolve, reject) => {
        RNAdyenHPP.isAvailable((error) => {
            if (error) {
                return reject(error)
            }
            resolve(true)
        })
    })
}
