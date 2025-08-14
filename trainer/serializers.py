# serializers.py
from rest_framework import serializers
from .models import TrainerProfile, YogaType

class TrainerProfileSerializer(serializers.ModelSerializer):
    yoga_types = serializers.PrimaryKeyRelatedField(
        many=True, queryset=YogaType.objects.all()
    )

    class Meta:
        model = TrainerProfile
        fields = [
            "name", "phone", "profile_image", "social_media_links",
            "location", "specialty", "yoga_types", "years_experience", "bio"
        ]
    
    def update(self, instance, validated_data):
        yoga_types = validated_data.pop('yoga_types', None)

        # Update normal fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update ManyToMany field
        if yoga_types is not None:
            instance.yoga_types.set(yoga_types)

        instance.save()
        return instance
