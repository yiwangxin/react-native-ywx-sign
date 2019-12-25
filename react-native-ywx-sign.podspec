require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']
  s.homepage     = 'https://github.com/yiwangxin/react-native-ywx-sign'
  s.authors      = package['author']
  s.platform     = :ios, "8.0"

  s.source       = { :git => "https://github.com/yiwangxin/react-native-ywx-sign.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/*.{h,m}"

  s.dependency 'React'
  s.dependency 'BjcaSignSDK'
end