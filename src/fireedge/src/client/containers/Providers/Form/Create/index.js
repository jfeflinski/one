import React, { useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router'

import { Container, LinearProgress } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

import FormStepper from 'client/components/FormStepper'
import Steps from 'client/containers/Providers/Form/Create/Steps'

import { PATH } from 'client/router/provision'
import useFetchAll from 'client/hooks/useFetchAll'
import useProvision from 'client/hooks/useProvision'
import useGeneral from 'client/hooks/useGeneral'

function ProviderCreateForm () {
  const history = useHistory()
  const { id } = useParams()
  const isUpdate = id !== undefined

  const {
    steps,
    defaultValues,
    resolvers
  } = Steps({ isUpdate })

  const {
    getProvider,
    getProvidersTemplates,
    createProvider,
    updateProvider,
    providersTemplates
  } = useProvision()
  const { showError } = useGeneral()

  const { data, fetchRequestAll, loading, error } = useFetchAll()

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(resolvers())
  })

  const onSubmit = formData => {
    const { provider, location, connection, registration_time: time } = formData
    const providerSelected = provider[0]
    const locationSelected = location[0]

    const providerTemplate = providersTemplates
      .find(({ name }) => name === providerSelected) ?? {}

    const formatData = {
      ...(!isUpdate && { name: `${providerSelected}_${locationSelected}` }),
      provider: providerSelected,
      connection: {
        ...connection,
        [providerTemplate.location_key]: locationSelected
      },
      registration_time: time
    }

    if (isUpdate) {
      updateProvider({ id, data: formatData })
        .then(() => history.push(PATH.PROVIDERS.LIST))
    } else {
      createProvider({ data: formatData })
        .then(() => history.push(PATH.PROVIDERS.LIST))
    }
  }

  useEffect(() => {
    isUpdate && fetchRequestAll([getProvider({ id }), getProvidersTemplates()])
  }, [isUpdate])

  useEffect(() => {
    if (data) {
      const [provider = {}, templates = []] = data

      const { TEMPLATE: { PROVISION_BODY = {} } } = provider
      const { connection, provider: providerName, registration_time: time } = PROVISION_BODY

      const {
        location_key: key
      } = templates?.find(({ name }) => name === providerName) ?? {}

      if (!key) {
        showError(`
          Cannot found provider template (${providerName}),
          ask your cloud administrator`)
        history.push(PATH.PROVIDERS.LIST)
      }

      const { [key]: location, ...connections } = connection

      methods.reset({
        provider: [providerName],
        registration_time: time,
        connection: connections,
        location: [location]
      }, { errors: false })
    }
  }, [data])

  if (error) {
    return <Redirect to={PATH.PROVIDERS.LIST} />
  }

  return (isUpdate && !data) || loading ? (
    <LinearProgress />
  ) : (
    <Container style={{ display: 'flex', flexFlow: 'column' }} disableGutters>
      <FormProvider {...methods}>
        <FormStepper steps={steps} schema={resolvers} onSubmit={onSubmit} />
      </FormProvider>
    </Container>
  )
}

export default ProviderCreateForm