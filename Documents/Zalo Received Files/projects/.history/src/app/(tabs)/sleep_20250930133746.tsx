import React, { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  Card,
  Input,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

type Dream = {
  id: string;
  title: string;
  date: string;          // ISO nhưng hiển thị dd/MM
  summary: string;
  tag: 'Lucid' | 'Nightmare' | 'Normal';
  mood: '😊' | '😐' | '😟';
};

const INITIAL: Dream[] = [
  {
    id: '1',
    title: 'Bay qua thành phố',
    date: '2025-09-28',
    summary: 'Mình có thể bay, nhìn thấy ánh đèn và bạn bè vẫy tay phía dưới.',
    tag: 'Lucid',
    mood: '😊',
  },
  {
    id: '2',
    title: 'Bị đuổi trong mê cung',
    date: '2025-09-27',
    summary: 'Có thứ gì đó đuổi theo trong mê cung, mình tìm mãi lối ra.',
    tag: 'Nightmare',
    mood: '😟',
  },
  {
    id: '3',
    title: 'Đi dạo cạnh biển',
    date: '2025-09-26',
    summary: 'Tiếng sóng rất êm, mình đi dọc bờ biển cùng người lạ.',
    tag: 'Normal',
    mood: '😊',
  },
];

export default function DreamsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Lucid' | 'Nightmare' | 'Normal'>('All');
  const router = useRouter();

  const data = useMemo(() => {
    return INITIAL.filter(d =>
      (filter === 'All' ? true : d.tag === filter) &&
      (search.trim().length === 0
        ? true
        : `${d.title} ${d.summary}`.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search, filter]);

  const lucidCount = INITIAL.filter(d => d.tag === 'Lucid').length;
  const nightmareCount = INITIAL.filter(d => d.tag === 'Nightmare').length;
  const total = INITIAL.length;

  const renderTag = (t: Dream['tag']) => {
    const map = {
      Lucid: { bg: '#EAF7F0', text: '#2F9E55', label: 'Lucid' },
      Nightmare: { bg: '#FFE9E7', text: '#D23A2E', label: 'Ác mộng' },
      Normal: { bg: '#EEF2F8', text: '#6C7A91', label: 'Bình thường' },
    } as const;
    const s = map[t];
    return (
      <XStack
        alignItems="center"
        paddingHorizontal={10}
        paddingVertical={4}
        borderRadius={999}
        backgroundColor={s.bg}
      >
        <Text fontSize={12} color={s.text} fontWeight="600">{s.label}</Text>
      </XStack>
    );
  };

  return (
    <YStack flex={1} backgroundColor="#F4F7FB">
      {/* Header */}
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={16} paddingVertical={12}>
        <Text fontSize={20} fontWeight="700">Nhật ký giấc mơ</Text>
        <Link href="/(tabs)/profile" asChild>
          <Button backgroundColor="transparent" height={36}>
            <Ionicons name="person-circle-outline" size={24} color="#111" />
          </Button>
        </Link>
      </XStack>

      {/* Search + Quick actions */}
      <YStack paddingHorizontal={16}>
        <XStack alignItems="center" height={48} borderRadius={12} borderWidth={1} backgroundColor="#FFFFFF" borderColor="#E8ECF3" paddingHorizontal={12}>
          <Ionicons name="search-outline" size={18} color="#6B6B6B" />
          <Input
            flex={1}
            height={48}
            fontSize={16}
            placeholder="Tìm giấc mơ (từ khóa, cảm xúc...)"
            value={search}
            onChangeText={setSearch}
            backgroundColor="transparent"
            marginLeft={8}
          />
          {search.length > 0 && (
            <Button backgroundColor="transparent" height={36} onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9AA7B4" />
            </Button>
          )}
        </XStack>

        {/* Filter chips */}
        <XStack alignItems="center" marginTop={10} gap={8}>
          {(['All', 'Lucid', 'Nightmare', 'Normal'] as const).map((key) => {
            const active = filter === key;
            return (
              <Button
                key={key}
                height={34}
                paddingHorizontal={12}
                borderRadius={999}
                backgroundColor={active ? '#085C9C' : '#FFFFFF'}
                borderWidth={1}
                borderColor={active ? '#085C9C' : '#E8ECF3'}
                onPress={() => setFilter(key)}
              >
                <Text fontSize={13} color={active ? '#FFFFFF' : '#111111'} fontWeight="600">
                  {key === 'All' ? 'Tất cả' : key === 'Nightmare' ? 'Ác mộng' : key === 'Normal' ? 'Bình thường' : 'Lucid'}
                </Text>
              </Button>
            );
          })}
        </XStack>
      </YStack>

      {/* Tiny stats */}
      <XStack paddingHorizontal={16} marginTop={12} alignItems="center" gap={8}>
        <Card flex={1} borderRadius={12} backgroundColor="#FFFFFF" paddingHorizontal={12} paddingVertical={12} borderWidth={1} borderColor="#E8ECF3">
          <Text fontSize={12} color="#6B6B6B">Lucid</Text>
          <XStack alignItems="center" justifyContent="space-between" marginTop={6}>
            <Text fontSize={16} fontWeight="700">{lucidCount}</Text>
            <AntDesign name="staro" size={16} color="#2F9E55" />
          </XStack>
        </Card>
        <Card flex={1} borderRadius={12} backgroundColor="#FFFFFF" paddingHorizontal={12} paddingVertical={12} borderWidth={1} borderColor="#E8ECF3">
          <Text fontSize={12} color="#6B6B6B">Ác mộng</Text>
          <XStack alignItems="center" justifyContent="space-between" marginTop={6}>
            <Text fontSize={16} fontWeight="700">{nightmareCount}</Text>
            <MaterialCommunityIcons name="weather-night" size={16} color="#D23A2E" />
          </XStack>
        </Card>
        <Card flex={1} borderRadius={12} backgroundColor="#FFFFFF" paddingHorizontal={12} paddingVertical={12} borderWidth={1} borderColor="#E8ECF3">
          <Text fontSize={12} color="#6B6B6B">Tổng</Text>
          <XStack alignItems="center" justifyContent="space-between" marginTop={6}>
            <Text fontSize={16} fontWeight="700">{total}</Text>
            <AntDesign name="book" size={16} color="#6C7A91" />
          </XStack>
        </Card>
      </XStack>

      {/* List */}
      <FlatList
        style={{ paddingHorizontal: 16, marginTop: 12 }}
        data={data}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <Separator backgroundColor="transparent" height={10} />}
        renderItem={({ item }) => (
          <Card
            borderRadius={12}
            backgroundColor="#FFFFFF"
            paddingHorizontal={12}
            paddingVertical={12}
            borderWidth={1}
            borderColor="#E8ECF3"
          >
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap={8}>
                <Text fontSize={20}>{item.mood}</Text>
                <YStack>
                  <Text fontSize={16} fontWeight="700">{item.title}</Text>
                  <Text fontSize={13} color="#6B6B6B">{formatDate(item.date)} • {item.summary}</Text>
                </YStack>
              </XStack>
              <XStack alignItems="center" gap={8}>
                {renderTag(item.tag)}
                <Button backgroundColor="transparent" height={36} onPress={() => router.push(`/(tabs)/dreams/${item.id}`)}>
                  <AntDesign name="right" size={18} color="#9AA7B4" />
                </Button>
              </XStack>
            </XStack>
          </Card>
        )}
      />

      {/* Compose / FAB */}
      <XStack position="absolute" right={16} bottom={24}>
        <Link href='/(tabs)/dreams/new' asChild>
          <Button
            height={56}
            width={56}
            borderRadius={28}
            backgroundColor="#085C9C"
            pressStyle={{ backgroundColor: '#2870A8' }}
          >
            <AntDesign name="plus" size={22} color="#FFFFFF" />
          </Button>
        </Link>
      </XStack>
    </YStack>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
