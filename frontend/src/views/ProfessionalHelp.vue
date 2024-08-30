<script setup>
import Card from "primevue/card";
</script>

<template>
  <div class="container py-5">
    <div class="professional-help">
      <Card class="mb-5">
        <template #content>
          <div class="content">
            <img src="@/assets/images/Rectangle 30.png" alt="colored rectangle" class="me-3 mb-3">
            <h3>Reach Out to Professional Mental Help Support</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque modi officia, facilis a fugiat assumenda quis, recusandae in totam similique iste fugit ullam delectus cupiditate eos repellat non? Numquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repudiandae ad iste dicta molestias, dolorum facere architecto neque vel illum sapiente consequatur tempore dolore libero consequuntur obcaecati eos, facilis aspernatur!</p>
          </div>
        </template>
      </Card>
      <Card class="mb-5">
        <template #content>
          <div class="content">
            <img src="@/assets/images/Rectangle 224.png" alt="colored rectangle" class="me-3 mb-3">
            <h3>Reach Out to Our Online Therapy Sessions with Professionals</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque modi officia, facilis a fugiat assumenda quis, recusandae in totam similique iste fugit ullam delectus cupiditate eos repellat non? Numquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repudiandae ad iste dicta molestias, dolorum facere architecto neque vel illum sapiente consequatur tempore dolore libero consequuntur obcaecati eos, facilis aspernatur!</p>
          </div>
        </template>
      </Card>
      <Card class="mb-5">
        <template #content>
          <div class="content">
            <img src="@/assets/images/Rectangle 246.png" alt="colored rectangle" class="me-3 mb-3">
            <h3>Local Mental Health Professional Help Line Finder</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque modi officia, facilis a fugiat assumenda quis, recusandae in totam similique iste fugit ullam delectus cupiditate eos repellat non? Numquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repudiandae ad iste dicta molestias, dolorum facere architecto neque vel illum sapiente consequatur tempore dolore libero consequuntur obcaecati eos, facilis aspernatur!</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.content img {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .content img {
    max-width: 400px;
    float: inline-start;
  }
}

@media screen and (min-width: 1200px) {
  .professional-help {
    width: 75%;
    margin: 0 auto;
  }
}
</style>