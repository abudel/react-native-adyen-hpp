
#import "RCTBridgeModule.h"

@import SafariServices;

@interface RNAdyenHPP : NSObject <RCTBridgeModule, SFSafariViewControllerDelegate>

@property (nonatomic) SFSafariViewController *safariView;

@end
  