import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';
import { Button, Card, Checkbox, Input, Label, Separator, Text, Theme, XStack, YStack } from 'tamagui';

// Logo app (đường dẫn đúng với cấu trúc bạn đang có)
const Logo = require('../../assets/images/FlowState.png');

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [showPw, setShowPw] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = () => {
    // FE-only: sau này gắn auth thật
  };

  return (
    <Theme name='light'>
      <YStack flex={1} alignItems='center' justifyContent='center' padding={16} backgroundColor='#9CD0E4'>
        <Image source={Logo} style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 24 }} />

        <Card
          width='90%'
          maxWidth={420}
          paddingHorizontal={20}
          paddingVertical={20}
          borderRadius={16}
          elevation={2}
          bordered
        >
          <YStack>
            {/* Title + subtitle */}
            <Text fontSize={24} fontWeight='600' marginBottom={4}>
              Chào mừng trở lại!
            </Text>
            <Text fontSize={13} color='#585858' marginBottom={16}>
              Tiếp tục hành trình <Text fontWeight='700'>FlowState</Text> của bạn
            </Text>

            {/* Email */}
            <Label fontSize={14} fontWeight='500' color='#585858' marginBottom={8}>
              Email
            </Label>
            <XStack
              alignItems='center'
              height={56}
              borderRadius={12}
              borderWidth={1}
              backgroundColor='#F8F8F8'
              borderColor='#E4E4E4'
              paddingHorizontal={12}
              marginBottom={16}
            >
              <MaterialCommunityIcons name='email-outline' size={18} color='#8C8C8C' />
              <Input
                flex={1}
                height={56}
                fontSize={16}
                placeholder='Nhập email của bạn'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                backgroundColor='transparent'
                marginLeft={8}
              />
            </XStack>

            {/* Password */}
            <Label fontSize={14} fontWeight='500' color='#585858' marginBottom={8}>
              Mật khẩu
            </Label>
            <XStack
              alignItems='center'
              height={56}
              borderRadius={12}
              borderWidth={1}
              backgroundColor='#F8F8F8'
              borderColor='#E4E4E4'
              paddingHorizontal={12}
            >
              <MaterialCommunityIcons name='lock-outline' size={18} color='#8C8C8C' />
              <Input
                flex={1}
                height={56}
                fontSize={16}
                placeholder='Nhập mật khẩu'
                secureTextEntry={!showPw}
                value={pw}
                onChangeText={setPw}
                backgroundColor='transparent'
                marginLeft={8}
              />
              <Button onPress={() => setShowPw((v) => !v)} backgroundColor='transparent' height={36} width={36}>
                {showPw ? (
                  <MaterialCommunityIcons name='eye-off-outline' size={20} color='#8C8C8C' />
                ) : (
                  <MaterialCommunityIcons name='eye-outline' size={20} color='#8C8C8C' />
                )}
              </Button>
            </XStack>

            {/* Remember + Forgot */}
            <XStack alignItems='center' justifyContent='space-between' marginTop={8} marginBottom={12}>
              <XStack alignItems='center'>
                <Checkbox size='$2' checked={remember} onCheckedChange={(val) => setRemember(!!val)} />
                <Text fontSize={13} color='#585858' onPress={() => setRemember((v) => !v)} style={{ marginLeft: 8 }}>
                  Nhớ mật khẩu
                </Text>
              </XStack>

              <Link href='/(auth)/forgot_password' asChild>
                <Text fontSize={14} fontWeight='500' color='#085C9C'>
                  Quên mật khẩu?
                </Text>
              </Link>
            </XStack>

            {/* Login button with icon */}
            <Button
              height={56}
              borderRadius={12}
              backgroundColor='#085C9C'
              pressStyle={{ backgroundColor: '#2870A8' }}
              onPress={onSubmit}
            >
              <XStack alignItems='center' space={8}>
                <MaterialIcons name='login' size={20} color='#FFFFFF' />
                <Text fontSize={16} fontWeight='600' color='white'>
                  Đăng nhập
                </Text>
              </XStack>
            </Button>

            {/* Separator */}
            <XStack alignItems='center' marginVertical={12}>
              <Separator flex={1} backgroundColor='#E0E6EE' />
              <Text fontSize={12} color='#585858' style={{ marginHorizontal: 12 }}>
                Hoặc
              </Text>
              <Separator flex={1} backgroundColor='#E0E6EE' />
            </XStack>

            {/* Google button with icon */}
            <Button height={56} borderRadius={12} backgroundColor='#FFFFFF' borderWidth={1} borderColor='#E4E4E4' onPress={() => router.push('/(auth)/google-login')}>
              <XStack alignItems='center' space={8}>
                <AntDesign name='google' size={20} color='#4285F4' />
                <Text fontSize={16} color='#111111'>
                  Đăng nhập bằng Google
                </Text>
              </XStack>
            </Button>

            {/* Register */}
            <Text textAlign='center' marginTop={12} color='#585858' fontSize={14}>
              Chưa có tài khoản?{' '}
              <Link href='/(auth)/register' asChild>
                <Text fontWeight='600' color='#085C9C'>
                  Đăng ký ngay
                </Text>
              </Link>
            </Text>
          </YStack>
        </Card>

        {/* Legal text (giữ nguyên nếu cần) */}
        <Text
          textAlign='center'
          color='#585858'
          fontSize={12}
          style={{ marginTop: 16, marginBottom: 16, opacity: 0.9 }}
        >
          Bằng cách đăng nhập bạn đồng ý với <Text style={{ color: '#085C9C' }}>điều khoản sử dụng</Text> và{' '}
          <Text style={{ color: '#085C9C' }}>chính sách bảo mật</Text> của chúng tôi
        </Text>
      </YStack>
    </Theme>
  );
}
