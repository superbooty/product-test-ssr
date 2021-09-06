export const categoriesQuery = `query categories($query: String!, $sort: String, $currentPage: Int, $pageSize: Int, $categoryId: String! ) {
    categories (
      query: $query
      sort: $sort
      currentPage: $currentPage
      pageSize: $pageSize
      categoryId: $categoryId
    ) {
      description
      breadcrumbs {
        facetCode
        facetName
        facetValueName
        removeQuery {
          query {
            value
          }
          url
        }
      }
      categoryCode
      categoryHierarchy {
        code
        count
        selected
        childSelected
        children
        depth
        leaf
        parentSelected
      }
      categoryName
      emailSignUpGateEnabled
      currentQuery {
        url
      }
      facets {
        category
        code
        name
        nofollow
        priority
        visible
        topValues {
          count
          name
          nofollow
          selected
          query {
            query {
              value
            }
            url
          }
        }
        values {
          count
          name
          nofollow
          selected
          query {
            query {
              value
            }
            url
          }
        }
      }
      freeTextSearch
      noProductsRedirectMsg
      lscoBreadcrumbs {
        name
        url
        linkClass
      }
      pagination {
        currentPage
        totalPages
        totalResults
      }
      products {
        channels
        code
        name
        url
        price {
          code
          currencyIso
          formattedValue
          hardPrice
          hardPriceFormattedValue
          regularPrice
          regularPriceFormattedValue
          softPrice
          softPriceFormattedValue
          value
        }
        priceRange {
          maxPrice {
            formattedValue
            value
            regularPrice
            softPrice
            hardPrice
          }
          minPrice {
            formattedValue
            value
            regularPrice
            softPrice
            hardPrice
          }
        }
        priceRangeFrom {
          maxPrice {
            formattedValue
            value
            regularPrice
            softPrice
            hardPrice
          }
          minPrice {
            formattedValue
            value
            regularPrice
            softPrice
            hardPrice
          }
        }
        baseProduct
        soldIndividually
        comingSoon
        averageOverallRatings
        noOfRatings
        soldOutForever
        sustainability
        findInStoreEligible
        customizable
        flxCustomization
        availableForPickup
        department
        pdpGroupId
        returnable
        variantOptions {
          code
          comingSoon
          customizable
          findInStoreEligible
          flxCustomization
          merchantBadge
          promotionalBadge
          sustainability
          name
          swatchUrl
          swatchAltText
          galleryList {
            galleryImage {
              altText
              format
              galleryIndex
              imageType
              url
            }
          }
          priceData {
            hardPrice
            hardPriceFormattedValue
            regularPrice
            regularPriceFormattedValue
            softPrice
            softPriceFormattedValue
            value
            currencyIso
          }
          soldIndividually
          soldOutForever
          url
        }
        lscoBreadcrumbs {
          categoryCode
          name
          url
        }
        swatchUrl
        swatchAltText
        galleryList {
          galleryImage {
            altText
            format
            galleryIndex
            imageType
            url
          }
        }
        merchantBadge
        promotionalBadge
        errors {
          component
          name
          time_thrown
          message
        }
      }
      seoMetaData {
        canonicalUrl
        metaDescription
        metaH1
        metaTitle
        robots
      }
      sorts {
        code
        name
        selected
      }
      spellingSuggestion {
        query
        suggestion
      }
    }
  }`;
  export default {
    categoriesQuery
  }