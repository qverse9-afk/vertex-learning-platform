import { defineQuery } from "next-sanity";

export const courseBySlugQuery = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    studentCount,
    learningOutcomes[] {
      icon,
      title,
      description
    },
    instructor-> {
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise,
      bio
    },
    category-> {
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[] {
      title,
      summary,
      lessons[]-> {
        _id,
        title,
        "slug": slug.current,
        duration
      }
    }
  }
`);

export const allCoursesQuery = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    "modulesCount": count(modules),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`);

export const lessonBySlugQuery = defineQuery(`
  *[_type == "lesson" && slug.current == $lessonSlug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources,
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      modules[] {
        title,
        lessons[]-> {
          _id,
          title,
          "slug": slug.current,
          duration
        }
      }
    }
  }
`);
