#import "RNAdyenHPP.h"
#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

@implementation RNAdyenHPP
@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSString *)url args:(NSDictionary *)args resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        UIColor *tintColorString = args[@"tintColor"];
        UIColor *barTintColorString = args[@"barTintColor"];
        BOOL fromBottom = [args[@"fromBottom"] boolValue];

        // Error if no url is passed
        if (!url) {
            RCTLogError(@"[SafariView] You must specify a url.");
            return;
        }
        // Initialize the Safari View
        self.safariView = [[SFSafariViewController alloc] initWithURL:[NSURL URLWithString:url] entersReaderIfAvailable:args[@"readerMode"]];
        
        self.safariView.delegate = self;

        // Set tintColor if available
        if (tintColorString) {
            UIColor *tintColor = [RCTConvert UIColor:tintColorString];
            if ([self.safariView respondsToSelector:@selector(setPreferredControlTintColor:)]) {
                [self.safariView setPreferredControlTintColor:tintColor];
            } else {
                [self.safariView.view setTintColor:tintColor];
            }
        }

        // Set barTintColor if available
        if (barTintColorString) {
            UIColor *barTintColor = [RCTConvert UIColor:barTintColorString];
            if ([self.safariView respondsToSelector:@selector(setPreferredBarTintColor:)]) {
                [self.safariView setPreferredBarTintColor:barTintColor];
            }
        }

        // Set modal transition style
        if(fromBottom) {
            self.safariView.modalPresentationStyle = UIModalPresentationOverFullScreen;
        }

        // Display the Safari View
        UIViewController *root  = [UIApplication sharedApplication].keyWindow.rootViewController;
        UIViewController *maybeModal = root.presentedViewController;

        UIViewController *modalRoot = root;

        if (maybeModal != nil) {
            modalRoot = maybeModal;
        }
 
        [modalRoot presentViewController:self.safariView animated:YES completion:nil];

        // [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafariViewOnShow" body:nil];

        resolve(@"OK");
    } @catch(NSException *exception) {
        NSError *error = nil;
        reject(@"RNAdyenHPP", @"can not open SFSafariViewController", error);
        
    }
}

@end
  
