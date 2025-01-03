import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';

const App = () => {
  const [images, setImages] = useState([
    { id: '1', name: 'Nature', src: 'https://corporate.walmart.com/content/dam/corporate/images/global-responsibility/sustainability/planet/nature/businessfornature-banner.png ', selected: false },
    { id: '2', name: 'City', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg', selected: false },
    { id: '3', name: 'Beach', src: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg', selected: false },
  ]);
  const [newImageName, setNewImageName] = useState('');
  const [newImageSrc, setNewImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const addImage = () => {
    if (!newImageName || !newImageSrc) {
      Alert.alert('Ошибка', 'Введите название и ссылку на изображение.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setImages((prevImages) => [
        ...prevImages,
        { id: Math.random().toString(), name: newImageName, src: newImageSrc, selected: false },
      ]);
      setNewImageName('');
      setNewImageSrc('');
      setLoading(false);
    }, 60000); // 60 секунд задержки
  };

  const toggleSelection = (id) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, selected: !image.selected } : image
      )
    );
  };

  const deleteSelectedImages = () => {
    setImages((prevImages) => prevImages.filter((image) => !image.selected));
  };

  const anySelected = images.some((image) => image.selected);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.heading}>Галерея</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Название изображения"
            value={newImageName}
            onChangeText={setNewImageName}
          />
          <TextInput
            style={styles.input}
            placeholder="Ссылка на изображение"
            value={newImageSrc}
            onChangeText={setNewImageSrc}
          />
          <TouchableOpacity style={styles.button} onPress={addImage} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Добавить</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.gallery}>
          {images.map((image) => (
            <TouchableOpacity
              key={image.id}
              onLongPress={() => toggleSelection(image.id)}
              onPress={() => image.selected && toggleSelection(image.id)}
            >
              <ImageBackground
                source={{ uri: image.src }}
                style={[styles.imageCard, image.selected && styles.imageSelected]}
                imageStyle={image.selected && styles.imageOpacity}
              >
                <Text style={styles.imageText}>{image.name}</Text>
                {image.selected && (
                  <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✔</Text>
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {anySelected && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteSelectedImages}>
          <Text style={styles.deleteButtonText}>Удалить выделенные</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  gallery: {
    marginTop: 10,
  },
  imageCard: {
    height: 150,
    marginBottom: 15,
    justifyContent: 'flex-end',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  imageSelected: {
    borderColor: '#007BFF',
  },
  imageOpacity: {
    opacity: 0.5,
  },
  imageText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
