import React, { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Card,
  Input,
  Label,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PRIMARY = '#9B59FF';
const PRIMARY_PRESSED = '#8B4AE8';

const TAGS = [
  'Ác mộng', 'Lucid', 'Bay', 'Rơi', 'Đuổi bắt', 'Nước', 'Kỳ lạ', 'Thời thơ ấu',
] as const;

type Mood = '😴' | '😐' | '😊';

export default function DreamNewScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [vivid, setVivid] = useState(3); // 1..5
  const [mood, setMood] = useState<Mood>('😊');
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const selectedTags = useMemo(
    () => Object.keys(picked).filter(k => picked[k]),
    [picked],
  );

  const toggleTag = (k: string) => setPicked(p => ({ ...p, [k]: !p[k] }));

  const onSave = () => {
    // TODO: lưu local / call API
    console.log({
      title, detail, vivid, mood, tags: selectedTags,
    });
    router.back();
  };

  return (
    <YStack flex={1} backgroundColor="#F4F7FB">
      {/* Header */}
      <XStack alignItems="center" paddingHorizontal={16} paddingVertical={12}>
        <Button backgroundColor="transparent" height={36} width={36} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </Button>
        <Text fontSize={18} fontWeight="700" style={{ marginLeft: 8 }}>Nhật ký giấc mơ</Text>
      </XStack>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        {/* CARD: Form giấc mơ */}
        <Card
          backgroundColor="#FFFFFF"
          borderWidth={1}
          borderColor="#E8ECF3"
          borderRadius={12}
          paddingHorizontal={16}
          paddingVertical={16}
        >
          <YStack>

            {/* Tiêu đề */}
            <Text fontSize={16} fontWeight="700" color="#1F1F1F">Giấc mơ hôm nay</Text>

            {/* Tiêu đề giấc mơ */}
            <YStack style={{ marginTop: 12 }}>
              <Label fontSize={13} color="#6B6B6B">Tiêu đề</Label>
              <XStack
                alignItems="center"
                height={52}
                borderRadius={12}
                borderWidth={1}
                backgroundColor="#F8F8F8"
                borderColor="#E4E4E4"
                paddingHorizontal={12}
                style={{ marginTop: 6 }}
              >
                <MaterialCommunityIcons name="notebook-edit-outline" size={18} color="#6B6B6B" />
                <Input
                  flex={1}
                  height={52}
                  fontSize={16}
                  placeholder="Ví dụ: Bay qua thành phố"
                  value={title}
                  onChangeText={setTitle}
                  backgroundColor="transparent"
                  style={{ marginLeft: 8 }}
                />
              </XStack>
            </YStack>

            {/* Nội dung */}
            <YStack style={{ marginTop: 12 }}>
              <Label fontSize={13} color="#6B6B6B">Nội dung giấc mơ</Label>
              <XStack
                alignItems="flex-start"
                minHeight={120}
                borderRadius={12}
                borderWidth={1}
                backgroundColor="#F8F8F8"
                borderColor="#E4E4E4"
                paddingHorizontal={12}
                paddingVertical={10}
                style={{ marginTop: 6 }}
              >
                <MaterialCommunityIcons name="text-long" size={18} color="#6B6B6B" />
                <Input
                  flex={1}
                  fontSize={15}
                  placeholder="Mô tả càng chi tiết càng tốt..."
                  value={detail}
                  onChangeText={setDetail}
                  backgroundColor="transparent"
                  multiline
                  style={{ marginLeft: 8, minHeight: 100 }}
                />
              </XStack>
            </YStack>

            {/* Vividness (chất lượng / mức nhớ) */}
            <YStack style={{ marginTop: 16 }}>
              <Label fontSize={13} color="#6B6B6B">Mức độ rõ của giấc mơ</Label>
              <XStack alignItems="center" style={{ marginTop: 6 }}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const index = i + 1;
                  const active = vivid >= index;
                  return (
                    <Button
                      key={index}
                      backgroundColor="transparent"
                      height={36}
                      width={36}
                      onPress={() => setVivid(index)}
                    >
                      <AntDesign name="star" size={20} color={active ? '#FFC107' : '#E0E0E0'} />
                    </Button>
                  );
                })}
              </XStack>
            </YStack>

            {/* Mood khi thức dậy */}
            <YStack style={{ marginTop: 10 }}>
              <Label fontSize={13} color="#6B6B6B">Tâm trạng khi thức dậy</Label>
              <XStack alignItems="center" style={{ marginTop: 6 }}>
                {(['😴', '😐', '😊'] as Mood[]).map(m => (
                  <Button
                    key={m}
                    backgroundColor={mood === m ? '#FFF3CC' : '#FFFFFF'}
                    borderWidth={1}
                    borderColor="#E8ECF3"
                    height={40}
                    borderRadius={999}
                    paddingHorizontal={14}
                    onPress={() => setMood(m)}
                    style={{ marginRight: 8 }}
                  >
                    <Text fontSize={18}>{m}</Text>
                  </Button>
                ))}
              </XStack>
            </YStack>

            {/* Tag / yếu tố */}
            <YStack style={{ marginTop: 10 }}>
              <Label fontSize={13} color="#6B6B6B">Từ khoá / yếu tố</Label>
              <XStack flexWrap="wrap" style={{ marginTop: 6 }}>
                {TAGS.map(tag => {
                  const active = picked[tag];
                  return (
                    <Button
                      key={tag}
                      backgroundColor={active ? '#EEF0FF' : '#FFFFFF'}
                      borderWidth={1}
                      borderColor={active ? PRIMARY : '#E8ECF3'}
                      height={36}
                      borderRadius={999}
                      paddingHorizontal={12}
                      onPress={() => toggleTag(tag)}
                      style={{ marginRight: 8, marginBottom: 8 }}
                    >
                      <Text fontSize={13} color={active ? PRIMARY : '#111111'} fontWeight="600">
                        {tag}
                      </Text>
                    </Button>
                  );
                })}
              </XStack>
            </YStack>

            {/* Nút lưu */}
            <Button
              height={52}
              borderRadius={12}
              backgroundColor={PRIMARY}
              onPress={onSave}
              pressStyle={{ backgroundColor: PRIMARY_PRESSED }}
              style={{ marginTop: 16 }}
            >
              <Text fontSize={16} fontWeight="700" color="#FFFFFF">Lưu giấc mơ</Text>
            </Button>
          </YStack>
        </Card>

        {/* Banner mẹo */}
        <Card
          backgroundColor="#F3E8FF"
          borderWidth={1}
          borderColor="#E3D7FE"
          borderRadius={12}
          paddingHorizontal={16}
          paddingVertical={14}
          style={{ marginTop: 16 }}
        >
          <XStack alignItems="center">
            <Ionicons name="bulb-outline" size={20} color={PRIMARY_PRESSED} />
            <YStack style={{ marginLeft: 10 }}>
              <Text fontSize={14} fontWeight="700" color="#1F1F1F">Mẹo ghi nhớ</Text>
              <Text fontSize={13} color="#6B6B6B">
                Ghi lại giấc mơ trong vòng 5 phút sau khi thức dậy để lưu lại chi tiết tốt nhất.
              </Text>
            </YStack>
          </XStack>
        </Card>

        <Separator backgroundColor="transparent" height={12} />
      </ScrollView>
    </YStack>
  );
}
